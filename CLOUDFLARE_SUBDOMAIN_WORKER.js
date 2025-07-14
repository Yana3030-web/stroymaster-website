// Cloudflare Worker для редиректа с основного домена на поддомен
// Разместите этот код в Cloudflare Workers

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Замените на ваш реальный домен
  const mainDomain = 'stroymaster11.ru'
  const subdomain = 'shop.stroymaster11.ru'
  
  // Если запрос идет на основной домен, редиректим на поддомен
  if (url.hostname === mainDomain || url.hostname === `www.${mainDomain}`) {
    const newUrl = `https://${subdomain}${url.pathname}${url.search}${url.hash}`
    
    return Response.redirect(newUrl, 301)
  }
  
  // Для всех остальных запросов возвращаем как есть
  return fetch(request)
}

// Альтернативный вариант с проверкой User-Agent для мобильных устройств
/*
addEventListener('fetch', event => {
  event.respondWith(handleRequestAdvanced(event.request))
})

async function handleRequestAdvanced(request) {
  const url = new URL(request.url)
  const userAgent = request.headers.get('User-Agent') || ''
  
  const mainDomain = 'stroymaster11.ru'
  const subdomain = 'shop.stroymaster11.ru'
  
  // Проверяем, мобильное ли устройство
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent)
  
  if (url.hostname === mainDomain || url.hostname === `www.${mainDomain}`) {
    // Для мобильных устройств всегда редиректим на поддомен
    if (isMobile) {
      const newUrl = `https://${subdomain}${url.pathname}${url.search}${url.hash}`
      return Response.redirect(newUrl, 301)
    }
    
    // Для десктопа можно добавить дополнительную логику
    const newUrl = `https://${subdomain}${url.pathname}${url.search}${url.hash}`
    return Response.redirect(newUrl, 301)
  }
  
  return fetch(request)
}
*/
