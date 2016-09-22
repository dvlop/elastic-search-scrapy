select track.name "track name", album.title as "album", artist.name as "artist", genre.name as "genre"
from album
inner join artist on album.artist_id = artist.artist_id
inner join track on album.album_id = track.album_id
inner join genre on genre.genre_id = track.genre_id
