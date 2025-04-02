#!/usr/bin/env python3
"""
Tailscale Online Machine Counter

This script uses the Tailscale API to count how many machines are currently online.
"""

import requests
import os
import argparse
import sys
import json
from datetime import datetime

def get_online_machines(api_key, tailnet=None):
    """
    Query the Tailscale API and return a count of online machines.

    Args:
        api_key (str): Your Tailscale API key
        tailnet (str, optional): Your Tailscale network name (usually your account name)
                                If not provided, will try to extract from API key

    Returns:
        tuple: (online_count, total_count, list of online machine names)
    """
    # If tailnet not provided, try to extract from API key
    if not tailnet and '.' in api_key:
        tailnet = api_key.split('.')[0]

    if not tailnet:
        raise ValueError("Tailnet name not provided and couldn't be extracted from API key")

    # API endpoint for devices
    url = f"https://api.tailscale.com/api/v2/tailnet/{tailnet}/devices"

    # Set up headers with API key authentication
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json"
    }

    try:
        # Make the API request
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Parse the JSON response
        data = response.json()

        # Filter for online machines
        online_machines = []
        total_machines = 0

        for device in data.get('devices', []):
            total_machines += 1
            # Check if the device is currently online
            if device.get('online', False):
                online_machines.append(device.get('name', 'Unknown'))

        return len(online_machines), total_machines, online_machines

    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Tailscale API: {e}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError:
        print("Error parsing API response", file=sys.stderr)
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Count online machines in your Tailscale network")
    parser.add_argument("-k", "--api-key", help="Tailscale API key (or set TAILSCALE_API_KEY env var)")
    parser.add_argument("-t", "--tailnet", help="Tailscale network name (usually your account name)")
    parser.add_argument("-v", "--verbose", action="store_true", help="List online machine names")
    args = parser.parse_args()

    # Get API key from arguments or environment
    api_key = "tskey-api-kYekCAwsEv11CNTRL-HG5zpVn8gBcmroZwjqpxAckWBekYdFQw" #args.api_key or os.environ.get("TAILSCALE_API_KEY")
    if not api_key:
        print("Error: Tailscale API key required. Provide it with --api-key or set TAILSCALE_API_KEY env var.",
              file=sys.stderr)
        sys.exit(1)

    # Get online machines
    online_count, total_count, online_machines = get_online_machines(api_key, "shel.bernstein123@gmail.com")

    # Display results
    print(f"Online machines: {online_count}/{total_count}")

    # If verbose, list the online machines
    if args.verbose and online_machines:
        print("\nOnline machine names:")
        for machine in sorted(online_machines):
            print(f"- {machine}")

    # Return the count as the exit code (useful for scripting)
    return online_count

if __name__ == "__main__":
    main()



#tskey-auth-kAnsNnCRJA11CNTRL-kXSNrmJAZiCxwuRt8tPkiCtcPS5EnQNx
#tskey-api-kYekCAwsEv11CNTRL-HG5zpVn8gBcmroZwjqpxAckWBekYdFQw
