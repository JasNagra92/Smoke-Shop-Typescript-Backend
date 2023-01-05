module "nat-instance" {
  source  = "int128/nat-instance/aws"
  version = "2.0.1"

  name                        = "main"
  vpc_id                      = aws_vpc.main.id
  public_subnet               = aws_subnet.public_subnet_a.id
  private_subnets_cidr_blocks = var.vpc_private_subnets
}

resource "aws_eip" "nat" {
  network_interface = module.nat-instance.eni_id
  tags = {
    "Name" = "nat-instance-main"
  }
}
