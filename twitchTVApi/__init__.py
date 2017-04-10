from flask import Flask

twitch_page = Flask(__name__)

from twitchTVApi import views
