function parseResolutionOutput(output) {
    // output = `[youtube] P9pzm5b6FFY: Downloading webpage
    // [info] Available formats for P9pzm5b6FFY:
    // format code  extension  resolution note
    // 249          webm       audio only tiny   49k , webm_dash container, opus  (48000Hz), 1.65MiB
    // 250          webm       audio only tiny   67k , webm_dash container, opus  (48000Hz), 2.24MiB
    // 140          m4a        audio only tiny  129k , m4a_dash container, mp4a.40.2 (44100Hz), 4.29MiB
    // 251          webm       audio only tiny  136k , webm_dash container, opus  (48000Hz), 4.53MiB
    // 160          mp4        256x144    144p   52k , mp4_dash container, avc1.4d400c, 30fps, video only, 1.75MiB
    // 278          webm       256x144    144p   58k , webm_dash container, vp9, 30fps, video only, 1.93MiB
    // 242          webm       426x240    240p   91k , webm_dash container, vp9, 30fps, video only, 3.03MiB
    // 133          mp4        426x240    240p  114k , mp4_dash container, avc1.4d4015, 30fps, video only, 3.80MiB
    // 243          webm       640x360    360p  157k , webm_dash container, vp9, 30fps, video only, 5.23MiB
    // 134          mp4        640x360    360p  215k , mp4_dash container, avc1.4d401e, 30fps, video only, 7.14MiB
    // 244          webm       854x480    480p  250k , webm_dash container, vp9, 30fps, video only, 8.30MiB
    // 135          mp4        854x480    480p  377k , mp4_dash container, avc1.4d401f, 30fps, video only, 12.48MiB
    // 247          webm       1280x720   720p  517k , webm_dash container, vp9, 30fps, video only, 17.13MiB
    // 136          mp4        1280x720   720p  767k , mp4_dash container, avc1.4d401f, 30fps, video only, 25.41MiB
    // 18           mp4        640x360    360p  343k , avc1.42001E, 30fps, mp4a.40.2 (44100Hz)
    // 22           mp4        1280x720   720p  895k , avc1.64001F, 30fps, mp4a.40.2 (44100Hz) (best)
    // `
    console.log('STR', output);

    let result = output.split('\n')
    result.shift()
    let id = result.shift().split(' ').pop().slice(0, -1) // id YT
    result.shift()

    return {
        id,
        options: result.map(line => {
            const matchLins = line.match(/\S+/g);
            if (!matchLins) return
            console.log(line);
            const data = {
                format_code: matchLins.shift(),
                extension: matchLins.shift(),
                resolution: matchLins[0] == 'audio' ? (matchLins.shift() +' '+  matchLins.shift()) : matchLins.shift(),
                quality: matchLins.shift(),
                bitrate: matchLins.shift(),
                note: matchLins.join(' ').slice(1).trim()
            }
            return data
        }).filter(d => d)
    }
}


// console.log(parseResolutionOutput(''));

module.exports = {
    parseResolutionOutput
}