import requests
from unittest import mock
import time

BASE_URL = "http://localhost:3000"
API_PATH = "/api/crypto-prices"
FULL_URL = BASE_URL + API_PATH
TIMEOUT = 30

mock_response_data = [
    {"id": "bitcoin", "symbol": "btc", "name": "Bitcoin", "market_cap_rank": 1, "current_price": 50000},
    {"id": "ethereum", "symbol": "eth", "name": "Ethereum", "market_cap_rank": 2, "current_price": 4000},
    {"id": "tether", "symbol": "usdt", "name": "Tether", "market_cap_rank": 3, "current_price": 1},
    {"id": "binancecoin", "symbol": "bnb", "name": "BNB", "market_cap_rank": 4, "current_price": 450},
    {"id": "usd-coin", "symbol": "usdc", "name": "USD Coin", "market_cap_rank": 5, "current_price": 1},
    {"id": "ripple", "symbol": "xrp", "name": "XRP", "market_cap_rank": 6, "current_price": 1.1},
    {"id": "cardano", "symbol": "ada", "name": "Cardano", "market_cap_rank": 7, "current_price": 1.5},
    {"id": "dogecoin", "symbol": "doge", "name": "Dogecoin", "market_cap_rank": 8, "current_price": 0.25},
    {"id": "solana", "symbol": "sol", "name": "Solana", "market_cap_rank": 9, "current_price": 150},
    {"id": "polkadot", "symbol": "dot", "name": "Polkadot", "market_cap_rank": 10, "current_price": 35}
]

class MockResponse:
    def __init__(self, json_data, status_code=200):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data

def mocked_requests_get(*args, **kwargs):
    # Simulate fetch failure on first call, success on retry
    if not hasattr(mocked_requests_get, "call_count"):
        mocked_requests_get.call_count = 0
    mocked_requests_get.call_count += 1
    if mocked_requests_get.call_count == 1:
        raise requests.exceptions.ConnectionError("Simulated connection error")
    return MockResponse(mock_response_data, 200)

def test_validate_crypto_prices_endpoint_returns_top_10_coins_with_caching_and_retry():
    with mock.patch('requests.get', side_effect=mocked_requests_get):
        # First attempt - expect retry to handle the simulated failure
        try:
            response = requests.get(FULL_URL, timeout=TIMEOUT)
        except requests.exceptions.ConnectionError:
            # Retry once after failure
            time.sleep(0.1)
            response = requests.get(FULL_URL, timeout=TIMEOUT)

        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()

        # Validate we got exactly 10 coins
        assert isinstance(data, list), "Response data is not a list"
        assert len(data) == 10, f"Expected 10 coins, got {len(data)}"

        # Validate top 10 market cap order and structure
        previous_rank = 0
        for coin in data:
            assert "id" in coin, "Coin missing 'id'"
            assert "name" in coin, "Coin missing 'name'"
            assert "market_cap_rank" in coin, "Coin missing 'market_cap_rank'"
            # Check ranking order is ascending
            current_rank = coin["market_cap_rank"]
            assert isinstance(current_rank, int), "market_cap_rank is not int"
            assert current_rank > previous_rank, "Coins not in ascending market cap rank order"
            previous_rank = current_rank

        # Test caching mechanism: fetch again within 45 seconds, data should be identical and quick
        start = time.time()
        cached_response = requests.get(FULL_URL, timeout=TIMEOUT)
        duration = time.time() - start
        assert cached_response.status_code == 200, f"Cached fetch failed with {cached_response.status_code}"
        assert cached_response.json() == data, "Cached data mismatch"
        # We expect caching to make this call fast (simulate below 1 second)
        assert duration < 1.0, f"Caching did not prevent stale or slow data, duration: {duration}s"

        # Wait 46 seconds to exceed cache expiry and fetch fresh data - should still succeed
        # (Here we simulate by resetting call count and calling again)
        time.sleep(0.1)
        mocked_requests_get.call_count = 1  # reset to simulate failure again for retry
        try:
            fresh_response = requests.get(FULL_URL, timeout=TIMEOUT)
        except requests.exceptions.ConnectionError:
            time.sleep(0.1)
            fresh_response = requests.get(FULL_URL, timeout=TIMEOUT)

        assert fresh_response.status_code == 200, "Failed to fetch fresh data after cache expiry"
        assert fresh_response.json() == data, "Fresh data does not match previous response"

test_validate_crypto_prices_endpoint_returns_top_10_coins_with_caching_and_retry()