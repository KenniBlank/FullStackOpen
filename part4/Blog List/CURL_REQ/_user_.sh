#!/bin/bash
PORT=3001
baseURL="http://localhost:$PORT"

create_user() {
    username="${1:-Hyouin Kyouma}"
    name="${2:-Okabe Rinataro}"
    password="${3:-El Psy Congroo}"

    data=$(jq -n \
        --arg username "$username" \
        --arg name "$name" \
        --arg password "$password" \
        '{username: $username, name: $name, password: $password}')

    curl -X POST "$baseURL/api/users"\
        -H "Content-Type: application/json" \
        -d "$data"
    echo "$data"
}

login_user() {
    username="${1:-Hyouin Kyouma}"
    password="${2:-El Psy Congroo}"

    data=$(jq -n \
        --arg username "$username" \
        --arg password "$password" \
        '{username: $username, password: $password}')

    ACCESS_TOKEN=$( \
        curl -sS -X POST "$baseURL/api/users" \
        -H "Content-Type: application/json" \
        -d "$data" | \
        jq -r ".access_token"
    )

    echo ACCESS_TOKEN
    return ACCESS_TOKEN
}

login() {
    curl -s -X POST "$baseURL/api/login" \
    -H "Content-Type: application/json" \
    -d '{"username": "john_doe", "password": "secure123"}'
}

test_login_and_blog_creation() {
    # Perform login
    response=$(login)

    # Extract data using jq
    ACCESS_TOKEN=$(echo "$response" | jq -r ".token")

    # Print the full response and extracted info
    echo "Token: $ACCESS_TOKEN"

    # Send blog post request
    curl -sS -X POST "$baseURL/api/blogs" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -d '{
    "title": "Something",
    "author": "John Doe",
    "url": "https://ewjkae132/",
    "likes": 10
    }'
}

test_deletion_of_blog() {
    response=$(login)
    ACCESS_TOKEN=$(echo "$response" | jq -r ".token")
    idOfBlogToBeDeleted="$1"

    # Send blog delete request
    curl -sS -X DELETE "$baseURL/api/blogs/${idOfBlogToBeDeleted}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ACCESS_TOKEN"
}

test_backend_put_req() {
    response=$(login)
    ACCESS_TOKEN=$(echo "$response" | jq -r ".token")
    idOfBlogToBeUpdated="$1"

    # Send blog put request to set likes to 10
    curl -X PUT "$baseURL/api/blogs/${idOfBlogToBeUpdated}" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"likes": 10}'
}
