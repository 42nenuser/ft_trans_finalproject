# Use a specific version of Python slim image
FROM python:3.9-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /code

# Install system dependencies and Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir --upgrade pip

# Copy only the requirements file first to leverage Docker cache
COPY requirements.txt /code/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project code and entrypoint script into the container
COPY . /code/

# Make the entrypoint script executable
RUN chmod +x /code/entrypoint.sh

# Run the entrypoint script
ENTRYPOINT ["/code/entrypoint.sh"]