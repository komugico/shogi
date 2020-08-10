from django.shortcuts import render
from django.views import generic
from django.http import response
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class IndexView(generic.TemplateView):
    template_name = "game/index.html"

class KifuView(LoginRequiredMixin, generic.TemplateView):
    template_name = "game/kifu.html"