// lib/rate-limit.ts
import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Simple in-memory rate limiting (for production, use Redis or similar)
const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export function rateLimit(config: RateLimitConfig) {
  return (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Clean up old entries
    Object.keys(store).forEach(key => {
      if (store[key]!.resetTime < windowStart) {
        delete store[key];
      }
    });

    // Check current IP
    if (!store[ip]) {
      store[ip] = {
        count: 1,
        resetTime: now + config.windowMs,
      };
      return { success: true, remaining: config.maxRequests - 1 };
    }

    const entry = store[ip]!;
    
    if (entry.resetTime < now) {
      // Reset window
      entry.count = 1;
      entry.resetTime = now + config.windowMs;
      return { success: true, remaining: config.maxRequests - 1 };
    }

    if (entry.count >= config.maxRequests) {
      return { 
        success: false, 
        remaining: 0,
        resetTime: entry.resetTime 
      };
    }

    entry.count++;
    return { 
      success: true, 
      remaining: config.maxRequests - entry.count 
    };
  };
}

// Contact form rate limiter: 5 requests per 15 minutes
export const contactFormRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
});