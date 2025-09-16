import requests
from requests.exceptions import RequestException
import re

BASE_URL = "http://localhost:3000"
TIMEOUT = 30
ENDPOINT = "/api/save-email-to-supabase"
URL = BASE_URL + ENDPOINT
HEADERS = {"Content-Type": "application/json"}

def test_subscribe_email_endpoint_for_valid_email_and_idempotency():
    valid_email = "test.email@example.com"
    invalid_email = "invalid-email"
    
    def subscribe_email(email):
        return requests.post(URL, json={"email": email}, headers=HEADERS, timeout=TIMEOUT)
    
    # Subscribe valid email first time
    try:
        response = subscribe_email(valid_email)
    except RequestException as e:
        assert False, f"Request to subscribe valid email failed: {e}"
    assert response.status_code == 200, f"Expected 200 but got {response.status_code} on first subscription"
    # The response description says "Subscribed or already subscribed"
    # so on first subscribe it should be successful
    
    # Subscribe same valid email again to test idempotency
    try:
        response2 = subscribe_email(valid_email)
    except RequestException as e:
        assert False, f"Request to subscribe email second time failed: {e}"
    assert response2.status_code == 200, f"Expected 200 but got {response2.status_code} on idempotent subscribe"
    
    # Subscribe with invalid email should return 400
    try:
        response_invalid = subscribe_email(invalid_email)
    except RequestException as e:
        assert False, f"Request with invalid email failed: {e}"
    assert response_invalid.status_code == 400, f"Expected 400 but got {response_invalid.status_code} on invalid email"
    
    # Test Method Not Allowed: GET on the POST endpoint should return 405
    try:
        response_method = requests.get(URL, timeout=TIMEOUT)
    except RequestException as e:
        assert False, f"GET request to POST endpoint failed: {e}"
    assert response_method.status_code == 405, f"Expected 405 but got {response_method.status_code} on wrong method"
    
    # Test Server Error simulation: 
    # Since no direct endpoint to simulate 500 is given, attempt sending malformed JSON to provoke server error
    try:
        # Sending invalid JSON by passing data as a string improperly
        response_server_error = requests.post(URL, data="{invalid_json:", headers=HEADERS, timeout=TIMEOUT)
    except RequestException as e:
        assert False, f"Request to provoke server error failed: {e}"
    # Accept both 400 or 500 here because server might 400 malformed JSON or 500 if unhandled
    assert response_server_error.status_code in (400, 500), (
        f"Expected 400 or 500 but got {response_server_error.status_code} on malformed JSON"
    )
    
test_subscribe_email_endpoint_for_valid_email_and_idempotency()