import streamlit as st

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


if 'score' not in st.session_state:
    st.session_state.score = 0

problem1 = st.text_input('이 사람의 아버지 성함은?')

problem2 = st.radio("이 사람의 축구실력은?", [":red[상]", ":blue[중상]", ":green[중]", "중하", ":gray[하]"])
ref = db.reference('')
if st.button('제출하기') :
    st.session_state.score = 0
    if (problem1 == "강래식") :
        st.session_state.score += 80
        ref.update({
        "score" : st.session_state.score
    })
        
    if (problem2 == ":green[중]") :
        st.session_state.score += 20
        ref.update({
        "score" : st.session_state.score
    })


