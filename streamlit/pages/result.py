import streamlit as st


st.write(st.session_state.name + "님 점수:")

if st.button('결과 보기') :
    st.write(st.session_state.score)