# Stage 1: Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Copy only the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run uvicorn server
# Use 0.0.0.0 to listen on all available network interfaces
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]