from datetime import datetime
import schedule
import time
from server.auth_app.models import Profile
# from server.common.helpers import my_mail


def send_emails():
    profiles = Profile.objects.all()

    for profile in profiles:
        # my_mail(None, profile.parent_email)
        profile.last_sent_email = datetime.now()


schedule.every().monday.at("19:00").do(send_emails)


def start_scheduler(request):
    while True:
        schedule.run_pending()
        time.sleep(1)
