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

    # Install PM2 globally
    npm install -g pm2
  EOF
  )

  tags = {
    Name        = "recipe-app-server-${count.index + 1}"
    Environment = "development"
  }
}