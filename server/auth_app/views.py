from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import permissions, generics, status, views
from rest_framework.response import Response

from server.auth_app.models import Profile
from server.auth_app.serializers import UserSerializer
from rest_framework.authtoken.models import Token


UserModel = get_user_model()


class UserCreate(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        # my_mail(request, request.data['profile']['parent_email'])
        user = UserModel.objects.get(username=serializer.data['username'])
        profile = Profile.objects.get(user_id=user.id)
        return Response({'token': token.key, 'user_id': user.id, 'username': user.username, 'avatar': profile.avatar},
                        status=status.HTTP_201_CREATED, headers=headers)


class LoginUserView(views.APIView):
    queryset = UserModel.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        check_user = UserModel.objects.filter(username=username)
        if not check_user:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user = authenticate(username=username, password=password)


        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=request.user)
            profile = Profile.objects.get(user_id=user.id)

            data = {
                'token': token.key,
                'user_id': request.user.pk,
                'username': request.user.username,
                'avatar': profile.avatar,
            }

            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
