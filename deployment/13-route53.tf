// get existing hosted zone resource using data instead of resource
data "aws_route53_zone" "main" {
  name         = var.main_api_server_domain
  private_zone = false
}
