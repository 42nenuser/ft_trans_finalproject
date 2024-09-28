# Use an official Python runtime as the base image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy the requirements file into the container
COPY requirements.txt /code/

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the project code into the container
COPY . /code/

# Copy the entrypoint script
COPY entrypoint.sh /code/
RUN chmod +x /code/entrypoint.sh

# Run the entrypoint script
ENTRYPOINT ["/code/entrypoint.sh"]