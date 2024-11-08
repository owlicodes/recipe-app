output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "instance_public_ips" {
  value = aws_instance.recipe_app[*].public_ip
}