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

test_login() {
    # Perform login
    response=$(curl -s -X POST "$baseURL/api/login" \
        -H "Content-Type: application/json" \
        -d '{"username": "john_doe", "password": "secure123"}')

    # Extract data using jq
    ACCESS_TOKEN=$(echo "$response" | jq -r ".token")
    USERNAME=$(echo "$response" | jq -r ".username")
    NAME=$(echo "$response" | jq -r ".name")

    # Print the full response and extracted info
    echo "$response" | jq .
    echo "Created By $USERNAME AKA $NAME"
    echo "Token: $ACCESS_TOKEN"

    # Send blog post request
    curl -sS -X POST "$baseURL/api/blogs" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -d '{
            "title": "Death'\''s game",
            "author": "John Doe",
            "url": "https://jkwjdkajw/",
            "likes": 5
        }'
}
