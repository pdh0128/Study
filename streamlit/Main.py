import streamlit as st
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import json

key_dict = json.loads(st.secrets["textkey"])
cred = credentials.Certificate(key_dict)

if not firebase_admin._apps :
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://ioting-3a752-default-rtdb.firebaseio.com'
    })

ref = db.reference('/')

st.title('이것은 내 페이지다')
st.header('말하겠다 :sunglasses:')



_LOREM_IPSUM = """
그는 부산남중학교 졸업생으로 현재 광명고에 재학중이다.
:red[그는] :orange[매우] :green[재미나고] :blue[병구] :violet[같은]
    :gray[매력이] :rainbow[있다] 그래서 :blue-background[좋더라].
"""


def description():
    for word in _LOREM_IPSUM.split(" "):
        yield word + " "
        time.sleep(0.01)
if st.button(":baby_chick:강민창:baby_chick:"):
    st.write_stream(description)
    st.slider("좋음", 0, 100, 99)

nametext = st.text_input('이름을 입력하세요.')
numbertext = st.number_input('학번을 입력하세요.')
if st.button('저장') :
    if 'name' not in st.session_state :
        st.session_state.name = nametext
        st.session_state.number = numbertext
        ref.set({
            'name' : st.session_state.name,
            'number' : st.session_state.number,
        })
    else :
        st.session_state.name = nametext
        st.session_state.number = numbertext
        ref.set({
            'name' : st.session_state.name,
            'number' : st.session_state.number,
        })


