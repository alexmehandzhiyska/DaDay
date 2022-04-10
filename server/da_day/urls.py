from django.urls import path

from server.common.schedule import start_scheduler
from server.da_day.views import NotesListView, NoteCreateView, NoteDetailsView

urlpatterns = [
    path('', start_scheduler),
    path('notes/<int:pk>', NotesListView.as_view(), name='notes'),
    path('note/<int:user_id>/<int:pk>', NoteDetailsView.as_view(), name='note details'),
    path('share-day/<int:pk>', NoteCreateView.as_view(), name='share'),
]
