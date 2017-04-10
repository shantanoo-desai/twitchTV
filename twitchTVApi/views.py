from twitchTVApi import twitch_page
from flask import render_template


@twitch_page.route('/')
def twitch():
    return render_template('index.html')
