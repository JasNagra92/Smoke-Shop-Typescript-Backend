terraform {
  backend "s3" {
    bucket  = "smoke-server-terraform-state"
    key     = "develop/smokeserver.tfstate"
    region  = "us-west-2"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"

  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "JasNagra"
  }
}
