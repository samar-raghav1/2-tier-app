# 🚀 DevOps Project with Docker, Jenkins, EC2, and MongoDB

## 📋 Prerequisites

Ensure the following are installed and configured before running the project:

- **Docker** → Install Docker on your EC2 instance or local machine.
- **Jenkins** → Install Jenkins on your EC2 instance for CI/CD automation.
- **AWS EC2 Instance** → Provision an Ubuntu-based EC2 instance.
- **MongoDB** → Choose one of the following:
  - MongoDB Atlas (cloud-hosted, recommended)
  - MongoDB installed on EC2
  - MongoDB configured with S3-backed storage

---

## 🛠️ Installation & Setup

### 1. Install Docker
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

sudo apt update
sudo apt install -y openjdk-11-jdk
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins


sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb


## Clone Repo
git clone https://github.com/samar-raghav1.git
cd <2-tier-app>

cp .env.sample .env

node index.js

