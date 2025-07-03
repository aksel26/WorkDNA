// Browser and device detection utilities

export function detectDevice(): string {
  const userAgent = navigator.userAgent;
  
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'Tablet';
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'Mobile';
  }
  
  return 'Desktop';
}

export function detectBrowser(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return 'Chrome';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Edg')) {
    return 'Edge';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    return 'Opera';
  }
  
  return 'Other';
}

export async function detectLocation(): Promise<{ country: string | null; region: string | null }> {
  try {
    // Using a free IP geolocation service with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3초 타임아웃
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    return {
      country: data.country_name || null,
      region: data.region || null
    };
  } catch (error) {
    console.error('Failed to detect location:', error);
    return {
      country: null,
      region: null
    };
  }
}

export function detectTrafficSource(): string {
  const referrer = document.referrer;
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check for UTM parameters or specific referrers
  if (urlParams.get('utm_source') === 'kakao' || referrer.includes('kakao')) {
    return 'Kakao';
  }
  
  // Add more traffic source detection logic here
  if (referrer && !referrer.includes(window.location.hostname)) {
    return 'Other';
  }
  
  return 'Direct';
}