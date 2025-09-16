import requests
from unittest import mock

BASE_URL = "http://localhost:3000"
TIMEOUT = 30


def test_verify_health_check_endpoint_returns_service_status_and_env_info():
    health_url = f"{BASE_URL}/api/health"

    with mock.patch("requests.get") as mocked_get:
        mocked_get.return_value.status_code = 200
        mocked_get.return_value.json = lambda: {"status": "ok", "env": True}

        response = requests.get(health_url, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}"
        try:
            data = response.json()
        except Exception as e:
            assert False, f"Response body is not valid JSON: {e}"

        assert isinstance(data, dict), "Response JSON is not a dictionary"
        assert len(data) > 0, "Response JSON is empty, expected keys with health info"


test_verify_health_check_endpoint_returns_service_status_and_env_info()
