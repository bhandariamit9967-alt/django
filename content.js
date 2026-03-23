const API_SIGNATURES = [
    { name: "React", category: "Framework", check: () => !!(window.React || window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || document.querySelector('[data-reactroot], [data-reactid]')), npm: "react", importSnippet: "import React from 'react';", docsUrl: "https://react.dev", cdnUrl: "https://unpkg.com/react@latest/umd/react.production.min.js" },
  { name: "Vue.js", category: "Framework", check: () => !!(window.Vue || window.__VUE__ || document.querySelector('[data-v-app]')), npm: "vue", importSnippet: "import { createApp } from 'vue';", docsUrl: "https://vuejs.org", cdnUrl: "https://unpkg.com/vue@latest/dist/vue.global.prod.js" },
  { name: "Angular", category: "Framework", check: () => !!(window.ng || window.angular || document.querySelector('[ng-version]')), npm: "@angular/core", importSnippet: "import { Component } from '@angular/core';", docsUrl: "https://angular.io", cdnUrl: null },
  { name: "Svelte", category: "Framework", check: () => !!(window.__svelte || document.querySelector('[class*="svelte-"]')), npm: "svelte", importSnippet: "import App from './App.svelte';", docsUrl: "https://svelte.dev", cdnUrl: null },
  { name: "Next.js", category: "Framework", check: () => !!(window.__NEXT_DATA__ || window.next), npm: "next", importSnippet: "import { NextPage } from 'next';", docsUrl: "https://nextjs.org", cdnUrl: null },
  { name: "Nuxt.js", category: "Framework", check: () => !!(window.__NUXT__ || window.$nuxt), npm: "nuxt", importSnippet: "import { defineNuxtConfig } from 'nuxt/config';", docsUrl: "https://nuxt.com", cdnUrl: null },
 
  // UI Libraries
  { name: "jQuery", category: "Library", check: () => !!(window.jQuery || window.$?.fn?.jquery), npm: "jquery", importSnippet: "import $ from 'jquery';", docsUrl: "https://jquery.com", cdnUrl: "https://code.jquery.com/jquery-3.7.1.min.js" },
  { name: "Bootstrap", category: "UI Library", check: () => !!(window.bootstrap || document.querySelector('link[href*="bootstrap"]')), npm: "bootstrap", importSnippet: "import 'bootstrap/dist/css/bootstrap.min.css';", docsUrl: "https://getbootstrap.com", cdnUrl: "https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css" },
  { name: "Tailwind CSS", category: "UI Library", check: () => !!(document.querySelector('[class*="tailwind"]') || Array.from(document.styleSheets).some(s => { try { return Array.from(s.cssRules || []).some(r => r.cssText?.includes('--tw-')); } catch(e) { return false; } })), npm: "tailwindcss", importSnippet: "// Add to HTML: <script src='https://cdn.tailwindcss.com'></script>", docsUrl: "https://tailwindcss.com", cdnUrl: "https://cdn.tailwindcss.com" },
  { name: "Material UI", category: "UI Library", check: () => !!(window.MaterialUI || document.querySelector('[class*="MuiBox"], [class*="MuiButton"]')), npm: "@mui/material", importSnippet: "import Button from '@mui/material/Button';", docsUrl: "https://mui.com", cdnUrl: null },
  { name: "Chakra UI", category: "UI Library", check: () => !!(document.querySelector('[data-theme*="chakra"], [class*="chakra-"]')), npm: "@chakra-ui/react", importSnippet: "import { ChakraProvider } from '@chakra-ui/react';", docsUrl: "https://chakra-ui.com", cdnUrl: null },
  { name: "Ant Design", category: "UI Library", check: () => !!(document.querySelector('[class*="ant-btn"], [class*="ant-"]')), npm: "antd", importSnippet: "import { Button } from 'antd';", docsUrl: "https://ant.design", cdnUrl: null },
 
  // Data & State Management
  { name: "Redux", category: "State Management", check: () => !!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.Redux || document.querySelector('[data-redux-store]')), npm: "redux", importSnippet: "import { createStore } from 'redux';", docsUrl: "https://redux.js.org", cdnUrl: "https://unpkg.com/redux@latest/dist/redux.min.js" },
  { name: "MobX", category: "State Management", check: () => !!(window.mobx || window.MobX), npm: "mobx", importSnippet: "import { makeObservable, observable } from 'mobx';", docsUrl: "https://mobx.js.org", cdnUrl: null },
  { name: "Zustand", category: "State Management", check: () => !!(window.__zustand), npm: "zustand", importSnippet: "import { create } from 'zustand';", docsUrl: "https://zustand-demo.pmnd.rs", cdnUrl: null },
 
  // HTTP & API Clients
  { name: "Axios", category: "HTTP Client", check: () => !!(window.axios), npm: "axios", importSnippet: "import axios from 'axios';", docsUrl: "https://axios-http.com", cdnUrl: "https://unpkg.com/axios/dist/axios.min.js" },
  { name: "GraphQL", category: "API", check: () => !!(window.__APOLLO_CLIENT__ || window.graphql || document.querySelector('[data-apollo]')), npm: "graphql", importSnippet: "import { gql } from 'graphql-tag';", docsUrl: "https://graphql.org", cdnUrl: null },
  { name: "Apollo Client", category: "API Client", check: () => !!(window.__APOLLO_CLIENT__ || window.ApolloClient), npm: "@apollo/client", importSnippet: "import { ApolloClient, InMemoryCache } from '@apollo/client';", docsUrl: "https://www.apollographql.com/docs/react", cdnUrl: null },
  { name: "SWR", category: "Data Fetching", check: () => !!(window.__SWR_DEVTOOLS_USE__), npm: "swr", importSnippet: "import useSWR from 'swr';", docsUrl: "https://swr.vercel.app", cdnUrl: null },
  { name: "React Query", category: "Data Fetching", check: () => !!(window.__REACT_QUERY_DEVTOOLS_GLOBAL__), npm: "@tanstack/react-query", importSnippet: "import { useQuery } from '@tanstack/react-query';", docsUrl: "https://tanstack.com/query", cdnUrl: null },
 
  // Charts & Visualization
  { name: "Chart.js", category: "Data Viz", check: () => !!(window.Chart), npm: "chart.js", importSnippet: "import { Chart } from 'chart.js';", docsUrl: "https://www.chartjs.org", cdnUrl: "https://cdn.jsdelivr.net/npm/chart.js" },
  { name: "D3.js", category: "Data Viz", check: () => !!(window.d3), npm: "d3", importSnippet: "import * as d3 from 'd3';", docsUrl: "https://d3js.org", cdnUrl: "https://d3js.org/d3.v7.min.js" },
  { name: "Highcharts", category: "Data Viz", check: () => !!(window.Highcharts), npm: "highcharts", importSnippet: "import Highcharts from 'highcharts';", docsUrl: "https://www.highcharts.com", cdnUrl: "https://code.highcharts.com/highcharts.js" },
  { name: "Three.js", category: "3D/WebGL", check: () => !!(window.THREE), npm: "three", importSnippet: "import * as THREE from 'three';", docsUrl: "https://threejs.org", cdnUrl: "https://unpkg.com/three@latest/build/three.min.js" },
 
  // Analytics & Tracking
  { name: "Google Analytics", category: "Analytics", check: () => !!(window.ga || window.gtag || window.dataLayer), npm: null, importSnippet: "<!-- In <head>: -->\n<script async src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'></script>", docsUrl: "https://analytics.google.com", cdnUrl: null },
  { name: "Segment", category: "Analytics", check: () => !!(window.analytics?.track), npm: "@segment/analytics-next", importSnippet: "import { AnalyticsBrowser } from '@segment/analytics-next';", docsUrl: "https://segment.com/docs", cdnUrl: null },
  { name: "Hotjar", category: "Analytics", check: () => !!(window.hj || window._hjSettings), npm: null, importSnippet: "// Via script tag only (no npm package)\n// See: https://hotjar.com/install", docsUrl: "https://help.hotjar.com", cdnUrl: null },
  { name: "Mixpanel", category: "Analytics", check: () => !!(window.mixpanel), npm: "mixpanel-browser", importSnippet: "import mixpanel from 'mixpanel-browser';", docsUrl: "https://docs.mixpanel.com", cdnUrl: null },
 
  // Payments
  { name: "Stripe", category: "Payments", check: () => !!(window.Stripe), npm: "@stripe/stripe-js", importSnippet: "import { loadStripe } from '@stripe/stripe-js';", docsUrl: "https://stripe.com/docs", cdnUrl: "https://js.stripe.com/v3/" },
  { name: "PayPal SDK", category: "Payments", check: () => !!(window.paypal), npm: "@paypal/react-paypal-js", importSnippet: "import { PayPalButtons } from '@paypal/react-paypal-js';", docsUrl: "https://developer.paypal.com", cdnUrl: null },
 
  // Auth
  { name: "Firebase", category: "Backend/Auth", check: () => !!(window.firebase || window.__FIREBASE_APP__), npm: "firebase", importSnippet: "import { initializeApp } from 'firebase/app';", docsUrl: "https://firebase.google.com/docs", cdnUrl: null },
  { name: "Auth0", category: "Auth", check: () => !!(window.auth0), npm: "@auth0/auth0-react", importSnippet: "import { Auth0Provider } from '@auth0/auth0-react';", docsUrl: "https://auth0.com/docs", cdnUrl: null },
  { name: "Supabase", category: "Backend/Auth", check: () => !!(window.supabase), npm: "@supabase/supabase-js", importSnippet: "import { createClient } from '@supabase/supabase-js';", docsUrl: "https://supabase.com/docs", cdnUrl: null },
 
  // Animation
  { name: "GSAP", category: "Animation", check: () => !!(window.gsap || window.TweenMax || window.TweenLite), npm: "gsap", importSnippet: "import gsap from 'gsap';", docsUrl: "https://greensock.com/gsap", cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" },
  { name: "Framer Motion", category: "Animation", check: () => !!(window.FramerMotion), npm: "framer-motion", importSnippet: "import { motion } from 'framer-motion';", docsUrl: "https://www.framer.com/motion", cdnUrl: null },
  { name: "Anime.js", category: "Animation", check: () => !!(window.anime), npm: "animejs", importSnippet: "import anime from 'animejs';", docsUrl: "https://animejs.com", cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" },
 
  // Build Tools / Runtime hints
  { name: "Webpack", category: "Build Tool", check: () => !!(window.webpackChunk || window.webpackJsonp || Object.keys(window).some(k => k.startsWith('webpackChunk'))), npm: "webpack", importSnippet: "// webpack.config.js\nconst path = require('path');\nmodule.exports = { entry: './src/index.js' };", docsUrl: "https://webpack.js.org", cdnUrl: null },
  { name: "Vite", category: "Build Tool", check: () => !!(window.__vite_plugin_react_preamble_installed__ || document.querySelector('script[type="module"][src*="@vite"]')), npm: "vite", importSnippet: "// vite.config.js\nimport { defineConfig } from 'vite';\nexport default defineConfig({});", docsUrl: "https://vitejs.dev", cdnUrl: null },
 
  // Maps
  { name: "Google Maps", category: "Maps", check: () => !!(window.google?.maps), npm: "@googlemaps/js-api-loader", importSnippet: "import { Loader } from '@googlemaps/js-api-loader';", docsUrl: "https://developers.google.com/maps", cdnUrl: null },
  { name: "Leaflet", category: "Maps", check: () => !!(window.L?.map), npm: "leaflet", importSnippet: "import L from 'leaflet';", docsUrl: "https://leafletjs.com", cdnUrl: "https://unpkg.com/leaflet@latest/dist/leaflet.js" },
  { name: "Mapbox GL", category: "Maps", check: () => !!(window.mapboxgl), npm: "mapbox-gl", importSnippet: "import mapboxgl from 'mapbox-gl';", docsUrl: "https://docs.mapbox.com", cdnUrl: null },
 
  // Misc
  { name: "Lodash", category: "Utility", check: () => !!(window._?.VERSION || window.lodash), npm: "lodash", importSnippet: "import _ from 'lodash';", docsUrl: "https://lodash.com", cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" },
  { name: "Moment.js", category: "Date/Time", check: () => !!(window.moment), npm: "moment", importSnippet: "import moment from 'moment';", docsUrl: "https://momentjs.com", cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js" },
  { name: "Day.js", category: "Date/Time", check: () => !!(window.dayjs), npm: "dayjs", importSnippet: "import dayjs from 'dayjs';", docsUrl: "https://day.js.org", cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.10/dayjs.min.js" },
  { name: "Socket.IO", category: "Real-time", check: () => !!(window.io?.protocol), npm: "socket.io-client", importSnippet: "import { io } from 'socket.io-client';", docsUrl: "https://socket.io/docs", cdnUrl: null },
  { name: "Sentry", category: "Monitoring", check: () => !!(window.Sentry || window.__sentryRewriteFrames), npm: "@sentry/browser", importSnippet: "import * as Sentry from '@sentry/browser';\nSentry.init({ dsn: 'YOUR_DSN' });", docsUrl: "https://docs.sentry.io", cdnUrl: null },
  { name: "Intercom", category: "Support", check: () => !!(window.Intercom), npm: "@intercom/messenger-js-sdk", importSnippet: "import Intercom from '@intercom/messenger-js-sdk';", docsUrl: "https://developers.intercom.com", cdnUrl: null },
  { name: "Crisp Chat", category: "Support", check: () => !!(window.$crisp), npm: null, importSnippet: "// Script tag only:\nwindow.$crisp=[];\nwindow.CRISP_WEBSITE_ID='YOUR_ID';", docsUrl: "https://docs.crisp.chat", cdnUrl: null },
  { name: "Algolia", category: "Search", check: () => !!(window.algoliasearch || document.querySelector('[class*="ais-"]')), npm: "algoliasearch", importSnippet: "import algoliasearch from 'algoliasearch';", docsUrl: "https://www.algolia.com/doc", cdnUrl: null },
  { name: "Cloudinary", category: "Media", check: () => !!(window.cloudinary || document.querySelector('img[src*="cloudinary.com"]')), npm: "cloudinary-core", importSnippet: "import { Cloudinary } from '@cloudinary/url-gen';", docsUrl: "https://cloudinary.com/documentation", cdnUrl: null },
  { name: "Twilio", category: "Communications", check: () => !!(window.Twilio), npm: "twilio", importSnippet: "const twilio = require('twilio');\nconst client = twilio(accountSid, authToken);", docsUrl: "https://www.twilio.com/docs", cdnUrl: null },
  { name: "Plyr", category: "Media Player", check: () => !!(window.Plyr || document.querySelector('.plyr')), npm: "plyr", importSnippet: "import Plyr from 'plyr';", docsUrl: "https://plyr.io", cdnUrl: "https://cdn.plyr.io/3.7.8/plyr.js" },
  { name: "Video.js", category: "Media Player", check: () => !!(window.videojs), npm: "video.js", importSnippet: "import videojs from 'video.js';", docsUrl: "https://videojs.com", cdnUrl: null },


];

function detectFromScripts() {
    const detected = []
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const links = Array.from(document.querySelectorAll("link[href]"));
    const allSrcs = [...scripts.map( s => s.src), ...links.map(l => l.href)];


    const patterns = [
        { pattern: /react[\.\-]/, name: "React (CDN)", category: "Framework", npm: "react", importSnippet: "import React from 'react';", docsUrl: "https://react.dev", cdnUrl: "https://unpkg.com/react@latest/umd/react.production.min.js" },
    { pattern: /vue[\.\-]/, name: "Vue.js (CDN)", category: "Framework", npm: "vue", importSnippet: "import { createApp } from 'vue';", docsUrl: "https://vuejs.org", cdnUrl: "https://unpkg.com/vue@latest/dist/vue.global.prod.js" },
    { pattern: /jquery[\.\-]/, name: "jQuery (CDN)", category: "Library", npm: "jquery", importSnippet: "import $ from 'jquery';", docsUrl: "https://jquery.com", cdnUrl: "https://code.jquery.com/jquery-3.7.1.min.js" },
    { pattern: /bootstrap[\.\-]/, name: "Bootstrap (CDN)", category: "UI Library", npm: "bootstrap", importSnippet: "import 'bootstrap/dist/css/bootstrap.min.css';", docsUrl: "https://getbootstrap.com", cdnUrl: "https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css" },
    { pattern: /tailwind/, name: "Tailwind CSS (CDN)", category: "UI Library", npm: "tailwindcss", importSnippet: "<script src='https://cdn.tailwindcss.com'></script>", docsUrl: "https://tailwindcss.com", cdnUrl: "https://cdn.tailwindcss.com" },
    { pattern: /gsap|greensock/, name: "GSAP (CDN)", category: "Animation", npm: "gsap", importSnippet: "import gsap from 'gsap';", docsUrl: "https://greensock.com/gsap", cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" },
    { pattern: /three[\.\-]/, name: "Three.js (CDN)", category: "3D/WebGL", npm: "three", importSnippet: "import * as THREE from 'three';", docsUrl: "https://threejs.org", cdnUrl: "https://unpkg.com/three@latest/build/three.min.js" },
    { pattern: /chart[\.\-]js/, name: "Chart.js (CDN)", category: "Data Viz", npm: "chart.js", importSnippet: "import { Chart } from 'chart.js';", docsUrl: "https://www.chartjs.org", cdnUrl: "https://cdn.jsdelivr.net/npm/chart.js" },
    { pattern: /stripe/, name: "Stripe (CDN)", category: "Payments", npm: "@stripe/stripe-js", importSnippet: "import { loadStripe } from '@stripe/stripe-js';", docsUrl: "https://stripe.com/docs", cdnUrl: "https://js.stripe.com/v3/" },
    { pattern: /firebase/, name: "Firebase (CDN)", category: "Backend/Auth", npm: "firebase", importSnippet: "import { initializeApp } from 'firebase/app';", docsUrl: "https://firebase.google.com/docs", cdnUrl: null },
    { pattern: /maps\.googleapis/, name: "Google Maps", category: "Maps", npm: "@googlemaps/js-api-loader", importSnippet: "import { Loader } from '@googlemaps/js-api-loader';", docsUrl: "https://developers.google.com/maps", cdnUrl: null },
    { pattern: /leaflet/, name: "Leaflet", category: "Maps", npm: "leaflet", importSnippet: "import L from 'leaflet';", docsUrl: "https://leafletjs.com", cdnUrl: "https://unpkg.com/leaflet@latest/dist/leaflet.js" },
    { pattern: /sentry/, name: "Sentry", category: "Monitoring", npm: "@sentry/browser", importSnippet: "import * as Sentry from '@sentry/browser';", docsUrl: "https://docs.sentry.io", cdnUrl: null },
    { pattern: /gtag|analytics/, name: "Google Analytics", category: "Analytics", npm: null, importSnippet: "<script async src='https://www.googletagmanager.com/gtag/js?id=GA_ID'></script>", docsUrl: "https://analytics.google.com", cdnUrl: null },
    { pattern: /intercom/, name: "Intercom", category: "Support", npm: "@intercom/messenger-js-sdk", importSnippet: "import Intercom from '@intercom/messenger-js-sdk';", docsUrl: "https://developers.intercom.com", cdnUrl: null },
    { pattern: /socket\.io/, name: "Socket.IO", category: "Real-time", npm: "socket.io-client", importSnippet: "import { io } from 'socket.io-client';", docsUrl: "https://socket.io/docs", cdnUrl: null },
    { pattern: /d3[\.\-]/, name: "D3.js (CDN)", category: "Data Viz", npm: "d3", importSnippet: "import * as d3 from 'd3';", docsUrl: "https://d3js.org", cdnUrl: "https://d3js.org/d3.v7.min.js" },
    { pattern: /mapbox/, name: "Mapbox GL", category: "Maps", npm: "mapbox-gl", importSnippet: "import mapboxgl from 'mapbox-gl';", docsUrl: "https://docs.mapbox.com", cdnUrl: null },
    { pattern: /cloudinary/, name: "Cloudinary", category: "Media", npm: "cloudinary-core", importSnippet: "import { Cloudinary } from '@cloudinary/url-gen';", docsUrl: "https://cloudinary.com/documentation", cdnUrl: null },
    ];

    for(const src of allSrcs){
        for(const p of patterns){
            if(p.pattern.test(src)){
                detected.push(p);
            }
        }
    }

    return detected;


}


function scanPage(){
    const found = [];
    const foundNames = new Set();

    for(const api of API_SSIGNATURES){
        try{
            if(api.check()){
                found.push(api);
                foundNames.add(api.name)
            }
        }catch(e) {

        }
    }


    const scriptDetected = detectFromScripts();
    for(const api of scriptDetected){
        const baseName = api.name.replace(" (CDN)", "");
        if(!foundNames.has(baseName) && !foundNames.has(api.name)){
            found.push(api);
            foundNames.add(api.name);
        }
    }
    return found;
}



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "scanPage"){
        const results = scanPage();
        sendResponse({ apis: results });
    }
    return true;
})