from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.http import HttpResponse

from server import settings
from server.auth_app.models import Profile

UserModel = get_user_model()


@shared_task
def send_email(request, email):
    if request:
        subject = "Registration greetings"
        msg = "Hello, we are pleasured to see that you choose DaDay for personal diary for your child. " \
              "We can ensure you that we will deliver the best possible experience for your beloved one " \
              "and give you weekly reports on their mental health status. " \
              "" \
              "Regards," \
              "AllowCookiesTeam"
    else:
        profiles = list(Profile.objects.filter(parent_email=email))

        subject = "Weekly report"
        msg = "Hello! " \
              f"Your weekly report is ready{'s' if len(profiles) > 1 else ''}, " \
              f"you can access it on link: " \
              f"{', '.join([f'{UserModel.objects.get(id=p.user_id).username}: 127.0.0.1:3000/weekly-report/{p.user_id}' for p in profiles])}"

    to = email
    res = send_mail(subject, msg, settings.EMAIL_HOST_USER, [to])

    if res == 1:
        msg = "Mail Sent Successfully."
    else:
        msg = "Mail Sending Failed."

    return HttpResponse(msg)
