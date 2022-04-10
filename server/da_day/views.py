import random
from django.contrib.auth import get_user_model
from rest_framework import views, status
from rest_framework.response import Response
from server.da_day.models import Note, Question
from server.da_day.serializers import NoteSerializer


UserModel = get_user_model()


class NotesListView(views.APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, pk):
        # if self.request.query_params.get('secure'):
        #     if not self.request.user.is_authenticated:
        #         return Response(status=status.HTTP_403_FORBIDDEN)

        if self.request.query_params.get('sorting') == 'asc':
            queryset = Note.objects.filter(user=pk).order_by('date')
        else:
            queryset = Note.objects.filter(user=pk).order_by('-date')

        serializer = NoteSerializer(queryset, many=True)

        return Response(data=serializer.data)


class NoteDetailsView(views.APIView):
    def get(self, request, pk):

        if self.request.query_params.get('secure'):
            if not self.request.user.is_authenticated:
                return Response(status=status.HTTP_403_FORBIDDEN)

        queryset = Note.objects.get(pk=pk)
        serializer = NoteSerializer(queryset, many=False)

        return Response({'note': serializer.data}, status=status.HTTP_200_OK)


class NoteCreateView(views.APIView):
    queryset = Question.objects.all()

    def get(self, request, pk):
        if not self.request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        question = random.choice(self.queryset.all()).__str__()
        return Response({'question': question}, status=status.HTTP_200_OK)

    def post(self, request, pk):
        text = request.data.get('text')
        avatar = request.data.get('avatar')

        user = UserModel.objects.get(id=pk)

        note = Note(
            description=text,
            emotion=avatar,
            user=user,
        )

        note.save()

        all_notes = Note.objects.filter(user_id=pk)

        if len(all_notes) >= 60:
            first_note = list(all_notes).pop(0)
            first_note.delete()

        return Response(status=status.HTTP_200_OK)
