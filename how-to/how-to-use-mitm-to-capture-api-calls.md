# Using MITMProxy to Capture API Calls

Sometimes it can be useful to know exactly what is being sent from the front-end to the back-end and vice versa. You can use [MITMProxy](https://mitmproxy.org) to accomplish this.

1. Download and install mitmproxy
2. Start the Django server on a different port (e.g. 8001): `./manage.py runserver 8001`
3. Start mitmweb in reverse proxy mode on port 8000:
    `./mitmweb --mode reverse:http://localhost:8000@8001 --set web_port=9002`
4. A browser should open with http://localhost:9002 loaded.

What we've done is started mitmweb on port 8000 (what Django usually runs on) and then forwarded the traffic on to our new port for Django (8001). In so doing all traffic between our front and back-end servers are intercepted by mitmweb and available for analysis.