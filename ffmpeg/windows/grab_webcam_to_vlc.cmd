D:\aib\ffmpeg\ffmpeg-20161207-6b95da9-win64-shared\bin\ffmpeg -re -f lavfi -i smptebars -vcodec libx264 -r 30 -tune zerolatency -s 640x480 -b 900k -sdp_file stream.sdp -f rtp "rtp://127.0.0.1:1234" | "C:\Program Files (x86)\VideoLAN\VLC\vlc" -vvv stream.sdp