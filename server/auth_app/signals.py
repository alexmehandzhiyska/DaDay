from django.db.models.signals import post_save
from django.dispatch import receiver
from server.auth_app.models import Profile
from server.auth_app.tasks import send_email


@receiver(post_save, sender=Profile)
def user_created(instance, created, *args, **kwargs):
    if created:
        return

    send_email.delay(True, instance.parent_email)
