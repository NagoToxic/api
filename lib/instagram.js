const axios = require('axios');
const cheerio = require('cheerio')


async function igstalk(user) { 
try {
const {data} = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=' + user, {
headers: {
"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
"x-asbd-id": "198387",
"x-csrftoken": "VXLPx1sgRb8OCHg9c2NKXbfDndz913Yp",
"x-ig-app-id": "936619743392459",
"x-ig-www-claim": "0"
}
})
return(data.status == 'ok' ? {
status: true,
profile: {
low: data.data.user.profile_pic_url,
high: data.data.user.profile_pic_url_hd
},
data: {
url: 'https://www.instagram.com/${user}/',
id: data.data.user.id,
fullname: data.data.user.full_name,
private: data.data.user.is_private,
verified: data.data.user.is_verified,
bio: data.data.user.biography,
follower: data.data.user.edge_followed_by.count,
following: data.data.user.edge_follow.count,
conneted_fb: data.data.user.connected_fb_page,
videotimeline: data.data.user.edge_felix_video_timeline.count,
timeline: data.data.user.edge_owner_to_timeline_media.count,
savedmedia: data.data.user.edge_saved_media.count,
collections: data.data.user.edge_media_collections.count,
}
} : {status: false, message: 'user not found'})
} catch {
return ({
status: false,
message: 'user not found'
})
}
}


async function igstalk2(usuario) { 
try {
response = await axios.get(`https://www.instagram.com/${usuario}/`)

    const html = response.data;

    const $ = cheerio.load(html);
    const userInfoElement = $('h1.rhpdm');

    const followersCount = $('meta[property="og:description"]').attr('content').split(' ')[0]; // Contagem de seguidores
    const followingCount = $('meta[property="og:description"]').attr('content').split(' ')[2]; // Contagem de pessoas seguidas
    const isPrivate = $('meta[property="og:description"]').attr('content').includes('Private'); // Verifica se o perfil é privado
    const profilePicUrl = $('meta[property="og:image"]').attr('content'); // URL da foto de perfil
    const bio = $('meta[property="og:description"]').attr('content').split(' • ')[1]; // Biografia
    const postCount = $('meta[property="og:description"]').attr('content').split(' ')[4];
    const username = $('meta[property="og:title"]').attr('content').split(' ')[0];
    const fullname = $('meta[property="og:title"]').attr('content').split('(')[0].trim();
    const username1 = $('header section h1').text().trim();
    const fullname1 = userInfoElement.find('span').text();

return {seguidores: followersCount || "", seguindo: followingCount || "", privado: isPrivate ? 'Sim' : 'Não', foto: profilePicUrl || "", bio: bio || "", publicacoes: postCount || "", nome: fullname || "", username: username1 || ""}

  }catch(error) {
    console.error('Ocorreu um erro ao obter dados do perfil do Instagram:', error);
  }
}

module.exports = { igstalk, igstalk2 };