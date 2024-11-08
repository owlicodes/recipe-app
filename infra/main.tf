resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "recipe-app-vpc"
    Environment = "development"
    Project     = "recipe-app"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  count             = 1 # Creates only 1 Public Subnet, can be removed along with count.index + 1, will retain just in case I want to add more
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name        = "recipe-app-public-subnet-${count.index + 1}"
    Environment = "development"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "recipe-app-igw"
    Environment = "development"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name        = "recipe-app-public-rt"
    Environment = "development"
  }
}

# Route Table Association for Public Subnets
resource "aws_route_table_association" "public" {
  count          = 1 # Creates only 1 Route Table Association, can be removed along with count.index + 1, will retain just in case I want to add more
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Security Group
resource "aws_security_group" "recipe_app_sg" {
  name        = "recipe-app-sg"
  description = "Security group for recipe app"
  vpc_id      = aws_vpc.main.id

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # In production, restrict this to your IP
  }

  # HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS access
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Recipe App PORT - Next.js PORT
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "recipe-app-sg"
    Environment = "development"
  }
}

# Key Pair
resource "aws_key_pair" "recipe_app_key" {
  key_name   = "recipe-app-key"
  public_key = file("~/.ssh/recipe-app-key.pub")
}

# Create an IAM role for EC2
resource "aws_iam_role" "ec2_role" {
  name = "recipe_app_ec2_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# EC2 Instances
resource "aws_instance" "recipe_app" {
  count = 1

  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"

  subnet_id                   = aws_subnet.public[count.index].id
  vpc_security_group_ids      = [aws_security_group.recipe_app_sg.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.recipe_app_key.key_name

  root_block_device {
    volume_size = 12
    volume_type = "gp2"
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    # Update system
    yum update -y
    yum install -y git

    # Install Node.js 20.x
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
    yum install -y nodejs

    # Create app user and set permissions
    useradd -m -s /bin/bash ec2-user
    mkdir -p /home/ec2-user/.ssh
    chmod 700 /home/ec2-user/.ssh
    touch /home/ec2-user/.ssh/authorized_keys
    chmod 600 /home/ec2-user/.ssh/authorized_keys
    chown -R ec2-user:ec2-user /home/ec2-user/.ssh

    # Install PM2 globally
    npm install -g pm2

    # Give ec2-user permission to use PM2
    sudo -u ec2-user pm2 startup
    env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user

    # Install and configure Nginx
    yum install -y nginx

    # Configure Nginx as a reverse proxy
    cat > /etc/nginx/conf.d/recipe-app.conf <<'EOL'
    server {
        listen 80;
        server_name _;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    EOL

    # Remove default Nginx configuration if it exists
    rm -f /etc/nginx/conf.d/default.conf

    # Start and enable Nginx
    systemctl start nginx
    systemctl enable nginx

    # Create application directory and set permissions
    mkdir -p /home/ec2-user/recipe-app
    chown -R ec2-user:ec2-user /home/ec2-user/recipe-app

    # Allow ec2-user to restart Nginx (optional, but useful for deployments)
    echo "ec2-user ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" >> /etc/sudoers.d/ec2-user-nginx
    chmod 440 /etc/sudoers.d/ec2-user-nginx

    # Set Node.js environment to production
    echo "export NODE_ENV=production" >> /home/ec2-user/.bashrc
  EOF
  )

  tags = {
    Name        = "recipe-app-server-${count.index + 1}"
    Environment = "development"
  }
}