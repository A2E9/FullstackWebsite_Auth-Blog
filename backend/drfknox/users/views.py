import json
import base64
import secrets

from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from knox.auth import AuthToken
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer

from .serializer import RegisterSerializer
from users.serializer import RegisterSerializer

from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives.asymmetric import dh, ec
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
from cryptography.hazmat.primitives.asymmetric.utils import encode_dss_signature

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes






                                                                                                                       

@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']

    user_info = {
        'id': user.id,
        'username': user.username,
        'password': user.password,
        'email': user.email,
    },
    
    token = AuthToken.objects.create(user)[1]
    is_staff = user.is_staff
    
    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'password': user.password,
            'email': user.email,
        },
        'token': token,
        'is_staff': is_staff,
    })

   


SECRET_KEY = b'0xasdfasdfasdfasdfasdfasdfasdfas'  #save in env angular
BLOCK_SIZE = 16

@api_view(['GET'])
def get_user_data(request):
    user = request.user

    def pad(data):
        return data + (BLOCK_SIZE - len(data) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(data) % BLOCK_SIZE).encode()

    def encrypt(raw_data, key):
        raw_data = pad(raw_data)
        iv = get_random_bytes(AES.block_size)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw_data))

    if user.is_authenticated:
        data = json.dumps({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'password': user.password,
            'email': user.email,
        },
        'token': AuthToken.objects.create(user)[1],
        'is_staff': user.is_staff,
    }).encode('utf-8')

        encrypted_data = encrypt(data, SECRET_KEY)
        return Response({'encrypted_data': encrypted_data.decode('utf-8')})
    
    return Response({'error': 'not authenticated'}, status=400)


@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    token = AuthToken.objects.create(user)
    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token

    })


class CurrentUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer







# Maybe when i have more time

# views.py
# import json
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from cryptography.hazmat.primitives.asymmetric import dh
# from cryptography.hazmat.primitives import serialization
# from cryptography.hazmat.primitives.kdf.hkdf import HKDF
# from cryptography.hazmat.primitives import hashes
# from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

# def generate_dh_parameters():
#     return dh.generate_parameters(generator=2, key_size=2048)

# def generate_dh_private_key(parameters):
#     return parameters.generate_private_key()

# def serialize_public_key(public_key):
#     return public_key.public_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PublicFormat.SubjectPublicKeyInfo
#     ).decode("utf-8")

# def deserialize_public_key(public_key_pem):
#     return serialization.load_pem_public_key(
#         public_key_pem.encode("utf-8")
#     )

# def derive_shared_key(private_key, public_key):
#     shared_key = private_key.exchange(public_key)
#     derived_key = HKDF(
#         algorithm=hashes.SHA256(),
#         length=32,
#         salt=None,
#         info=b"handshake data",
#     ).derive(shared_key)
#     return derived_key

# def encrypt_data(shared_key, data):
#     iv = os.urandom(12)
#     cipher = Cipher(algorithms.AES(shared_key), modes.GCM(iv))
#     encryptor = cipher.encryptor()
#     ciphertext = encryptor.update(data.encode("utf-8")) + encryptor.finalize()

#     return {
#         "iv": base64.b64encode(iv).decode("utf-8"),
#         "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
#         "tag": base64.b64encode(encryptor.tag).decode("utf-8"),
#     }

# @csrf_exempt
# def dh_key_exchange(request):
#     if request.method == "POST":
#         client_public_key_pem = json.loads(request.body.decode("utf-8"))["publicKey"]
#         client_public_key = deserialize_public_key(client_public_key_pem)

#         parameters = generate_dh_parameters()
#         server_private_key = generate_dh_private_key(parameters)
#         server_public_key = server_private_key.public_key()

#         shared_key = derive_shared_key(server_private_key, client_public_key)
#         encrypted_data = encrypt_data(shared_key, "Your sensitive data")

#         response_data = {
#             "publicKey": serialize_public_key(server_public_key),
#             "encryptedData": encrypted_data
#         }
#         return JsonResponse(response_data)

#     return JsonResponse({"error": "Invalid request method"}, status=400)
