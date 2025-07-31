"use client";

import { useOrder, DocumentItem } from "@/context/orderContext";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  ChevronLeft,
  Clock,
  Search,
  Store,
  Home,
  Check,
  MapPinOff,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

// --- React Toastify Imports ---
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
// --- End React Toastify Imports ---
import { useRouter } from "next/navigation";

import TotalFilesIcon from "@/public/Print&Deliver/TotalFilesIcon";
import LocationPin from "@/public/Print&Deliver/LocationPin";
import BookMark from "@/public/Print&Deliver/BookMark";
import Share from "@/public/Print&Deliver/Share";
import CartPanel from "./Components/CartPanel";
import CartPanelProduct from "./Components/CartPanelProduct";
import { getTotalDocument } from "../TotalDocument";
import SummaryBarNotSelected from "./Components/SummaryBarNotSelected";
import SummaryBarSelected from "./Components/SummaryBarSelected";
import { Order } from "@/context/orderContext"; // Make sure this is the correct path
import BottomNavigation from "./Components/BottomNavigation";
import MerchantImage from "./Components/MerchantImage";

interface Merchant {
  merchantId: string;
  shopName: string;
  latitude: string | null;
  longitude: string | null;
  MerchantImages: any[];
  averageRating: string;
  ratingCount: number;
  googleDistance: string;
  duration: string;
  durationInTraffic: string;
  features: string[];
  address?: string;
  services?: string[];
}

// Mock merchant data
const MERCHANTS: Merchant[] = [
  {
    merchantId: "merchant_1",
    shopName: "Print Master Shop",
    latitude: "40.7150",
    longitude: "-74.0080",
    MerchantImages: ["/shopimage.png"],
    averageRating: "4.80",
    ratingCount: 123,
    googleDistance: "5.1km",
    duration: "2 min",
    durationInTraffic: "2 mins",
    features: [
      "Poster Printing",
      "Business Cards",
      "Photo Books",
      "Document Printing",
    ],
    address: "123 Main St, New York, NY 10001",
  },
  {
    merchantId: "merchant_2",
    shopName: "Quality Print Solutions",
    latitude: "40.7090",
    longitude: "-74.0120",
    MerchantImages: ["/shopimage.png"],
    averageRating: "4.90",
    ratingCount: 500,
    googleDistance: "5.1km",
    duration: "2 min",
    durationInTraffic: "6 mins",
    features: [
      "Poster Printing",
      "Business Cards",
      "Photo Books",
      "Document Printing",
    ],
    address: "456 Oak Ave, New York, NY 10004",
  },
  {
    merchantId: "merchant_3",
    shopName: "Quick Print Services",
    latitude: "40.7200",
    longitude: "-73.9950",
    MerchantImages: ["/shopimage.png"],
    averageRating: "3.50",
    ratingCount: 56,
    googleDistance: "5.1km",
    duration: "2 min",
    durationInTraffic: "10 mins",
    features: [
      "Poster Printing",
      "Business Cards",
      "Photo Books",
      "Document Printing",
    ],
    address: "789 Pine Ln, New York, NY 10002",
  },
];

type DeliveryOption = "pickup" | "delivery";
type LocationPermissionStatus =
  | "prompt"
  | "granted"
  | "denied"
  | "unsupported"
  | "loading";

declare global {
  interface Window {
    google: any;
  }
}

// Map Popup Component
function MapPopup({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  currentLocation: { lat: number; lng: number } | null;
}) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Only initialize the map if Google Maps is already loaded
    if (window.google?.maps) {
      initializeMap();
    }
    // If not loaded, do nothing (script is loaded by parent)
  }, [isOpen]);

  const initializeMap = () => {
    const mapContainer = document.getElementById("popup-map");
    if (!mapContainer) return;

    const center = currentLocation || { lat: 40.7128, lng: -74.006 };

    const map = new window.google.maps.Map(mapContainer, {
      center: center,
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER,
      },
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
      draggable: true,
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#06044b" stroke="#ffffff" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3" fill="#61e987"></circle>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(15, 30),
      },
    });

    const geocoder = new window.google.maps.Geocoder();

    // Handle map clicks
    map.addListener("click", (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      marker.setPosition({ lat, lng });

      geocoder.geocode(
        { location: { lat, lng } },
        (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            onLocationSelect({ lat, lng, address });
          }
        }
      );
    });

    // Handle marker drag
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      if (position) {
        const lat = position.lat();
        const lng = position.lng();

        geocoder.geocode(
          { location: { lat, lng } },
          (results: any, status: any) => {
            if (status === "OK" && results[0]) {
              const address = results[0].formatted_address;
              onLocationSelect({ lat, lng, address });
            }
          }
        );
      }
    });

    setMapLoaded(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] h-[600px] relative shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#06044b]">
            Select Your Location
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Click on the map or drag the marker to select your location
          </p>
        </div>

        <div className="p-6 h-[calc(100%-140px)]">
          <div
            id="popup-map"
            className="w-full h-full rounded-lg border border-gray-200"
            style={{ minHeight: "350px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function LocationSelectionPage() {
  const { user } = useUser();
  const router = useRouter();
  const { order, dispatch } = useOrder();

  // Map popup state
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  // Fixed: Changed from String to string for consistency
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [hoveredMerchant, setHoveredMerchant] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>("pickup");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationPermission, setLocationPermission] =
    useState<LocationPermissionStatus>("loading");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyMerchants, setNearbyMerchants] = useState<Merchant[]>([]);
  const [isLoadingMerchants, setIsLoadingMerchants] = useState(true);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const merchantMarkersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart items data (moved from CartPanelProduct)
  const cartItems = [
    {
      id: 1,
      name: "File 1 - Jay Vasani UX.nh",
      description: "1 page, Black & White, Portrait",
      copies: 15,
      price: 122.5,
    },
    {
      id: 2,
      name: "Business Card Design",
      description: "Standard size, Color printing",
      copies: 100,
      price: 250.0,
    },
    {
      id: 3,
      name: "Photo Album",
      description: "20 pages, Color, Landscape",
      copies: 2,
      price: 450.0,
    },
  ];

  const filteredMerchants = nearbyMerchants.filter((merchant) =>
    merchant.shopName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCart = () => {
    if (!selectedMerchant) {
      toast.error("Please select a merchant first.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    setIsCartOpen(true);
  };

  const handelOrderSubmit = async () => {
    const orderFinal = {
      ...order,
    };

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/order/`,
        {
          method: "POST",
          body: JSON.stringify({
            ...order,
            merchantId: selectedMerchant,
            userId: user?.id || "1",
            latitude: selectedLocation?.lat || userLocation?.lat,
            longitude: selectedLocation?.lng || userLocation?.lng,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log({ ...orderFinal, merchantId: selectedMerchant });
      const res = await result.json();
      console.log(res);

      if (result.ok) {
        toast.success("🦄 Wow so easy! Order submitted successfully.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        router.push("/orders");
      } else {
        toast.error(
          res.message || "Order submission failed. Please try again.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
          }
        );
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const getUserLocation = () => {
    setLocationPermission("loading");
    setIsLoadingMerchants(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userCoords);
        setLocationPermission("granted");

        // Check if Google Maps is loaded before using Geocoder
        if (
          window.google &&
          window.google.maps &&
          window.google.maps.Geocoder
        ) {
          try {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
              { location: userCoords },
              (results: any, status: any) => {
                if (status === "OK" && results && results[0]) {
                  setSelectedLocation({
                    lat: userCoords.lat,
                    lng: userCoords.lng,
                    address: results[0].formatted_address,
                  });
                  toast.success("Current location selected automatically!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                  });
                } else {
                  setSelectedLocation({
                    lat: userCoords.lat,
                    lng: userCoords.lng,
                    address: `${userCoords.lat.toFixed(
                      4
                    )}, ${userCoords.lng.toFixed(4)}`,
                  });
                }
              }
            );
          } catch (error) {
            console.error("Geocoding error:", error);
            setSelectedLocation({
              lat: userCoords.lat,
              lng: userCoords.lng,
              address: `${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(
                4
              )}`,
            });
          }
        } else {
          setSelectedLocation({
            lat: userCoords.lat,
            lng: userCoords.lng,
            address: `${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(
              4
            )}`,
          });
        }

        if (googleMapRef.current) {
          updateUserLocationOnMap(userCoords);
        }

        (async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/user/nearest-merchants?lat=${userCoords.lat}&long=${userCoords.lng}`
            );
            const data = await response.json();

            if (!response.ok) {
              console.log("Error while fetching Merchant data:", data);
              setNearbyMerchants(MERCHANTS);
            } else {
              console.log("Nearby merchants from API:", data);
              const apiMerchants: Merchant[] = data.map((item: any) => ({
                merchantId: item.merchantId,
                shopName: item.shopName,
                latitude: item.latitude ? String(item.latitude) : null,
                longitude: item.longitude ? String(item.longitude) : null,
                MerchantImages: item.MerchantImages || [],
                averageRating: item.averageRating || "0.00",
                ratingCount: item.ratingCount || 0,
                googleDistance: item.googleDistance || "N/A",
                duration: item.duration || "N/A",
                durationInTraffic: item.durationInTraffic || "N/A",
                address: item.address
                  ? String(item.address)
                  : "Address not available",
                features: item.features || [],
              }));
              setNearbyMerchants(apiMerchants);
            }
          } catch (e) {
            console.log("Error while calling API", e);
            setNearbyMerchants(MERCHANTS);
          } finally {
            setIsLoadingMerchants(false);
          }
        })();
      },
      (error) => {
        // Improved error handling
        console.error("Geolocation error:", error);
        let message = "Unable to access your location.";
        if (error && typeof error === "object") {
          if (error.code === error.PERMISSION_DENIED) {
            message =
              "Location permission denied. Please allow access to use this feature.";
            setLocationPermission("denied");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            message = "Location information is unavailable.";
          } else if (error.code === error.TIMEOUT) {
            message = "Location request timed out.";
          }
        }
        toast.error(message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
        setLocationPermission("denied");
        setIsLoadingMerchants(false);
        setNearbyMerchants(MERCHANTS);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  // Auto-request location permission on page load
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationPermission("unsupported");
      setIsLoadingMerchants(false);
      setNearbyMerchants(MERCHANTS);
      return;
    }

    // Only load Google Maps script if not already present
    const scriptId = "google-maps-script";
    const existingScript = document.getElementById(scriptId);
    if (window.google?.maps) {
      getUserLocation();
      return;
    }
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        getUserLocation();
      };
      script.onerror = () => {
        console.warn("Google Maps failed to load, using fallback");
        getUserLocation();
      };
      document.head.appendChild(script);
    } else {
      existingScript.onload = () => getUserLocation();
      existingScript.onerror = () => {
        console.warn("Google Maps failed to load, using fallback");
        getUserLocation();
      };
      if (window.google?.maps) {
        getUserLocation();
      }
    }
  }, []);

  useEffect(() => {
    if (mapLoaded && googleMapRef.current) {
      merchantMarkersRef.current.forEach((marker) => marker.setMap(null));
      merchantMarkersRef.current.clear();

      if (!infoWindowRef.current) {
        infoWindowRef.current = new window.google.maps.InfoWindow();
      }

      nearbyMerchants.forEach((merchant) => {
        if (merchant.latitude && merchant.longitude) {
          const merchantCoords = {
            lat: parseFloat(merchant.latitude),
            lng: parseFloat(merchant.longitude),
          };

          const merchantIcon = {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06044b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3" fill="#61e987"></circle>
                </svg>`
              ),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          };

          const marker = new window.google.maps.Marker({
            position: merchantCoords,
            map: googleMapRef.current,
            title: merchant.shopName,
            icon: merchantIcon,
            zIndex: 900,
          });

          marker.infoWindowContent = `
            <div style="font-family: sans-serif; padding: 5px; text-align: center; color: #06044b;">
              <strong style="font-size: 1.1em;">${merchant.shopName}</strong>
              ${
                merchant.address
                  ? `<p style="font-size: 0.8em; margin-top: 5px; color: #555;">${merchant.address}</p>`
                  : ""
              }
            </div>
          `;

          marker.addListener("click", () => {
            setSelectedMerchant((prev) =>
              prev === merchant.merchantId ? null : merchant.merchantId
            );
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            infoWindowRef.current?.setContent(marker.infoWindowContent);
            infoWindowRef.current?.open(googleMapRef.current, marker);

            const element = document.getElementById(
              `merchant-${merchant.merchantId}`
            );
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });

          merchantMarkersRef.current.set(merchant.merchantId, marker);
        }
      });

      googleMapRef.current.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
      });
    }
  }, [nearbyMerchants, mapLoaded]);

  useEffect(() => {
    if (selectedMerchant && googleMapRef.current && mapLoaded) {
      const selectedMerchantData = nearbyMerchants.find(
        (m) => m.merchantId === selectedMerchant
      );

      if (
        selectedMerchantData &&
        selectedMerchantData.latitude &&
        selectedMerchantData.longitude
      ) {
        const selectedCoords = {
          lat: parseFloat(selectedMerchantData.latitude),
          lng: parseFloat(selectedMerchantData.longitude),
        };
        googleMapRef.current.panTo(selectedCoords);
        googleMapRef.current.setZoom(15);

        const marker = merchantMarkersRef.current.get(selectedMerchant);
        if (marker && infoWindowRef.current) {
          infoWindowRef.current.close();
          //@ts-ignore
          infoWindowRef.current.setContent(marker.infoWindowContent);
          infoWindowRef.current.open(googleMapRef.current, marker);
        }
      }
    }
  }, [selectedMerchant, nearbyMerchants, mapLoaded]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 40.7128, lng: -74.006 };
    const initialCenter = userLocation || defaultCenter;

    const mapOptions: google.maps.MapOptions = {
      center: initialCenter,
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP,
      },
    };

    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      googleMapRef.current = map;
      setMapLoaded(true);

      if (userLocation) {
        updateUserLocationOnMap(userLocation);
      }
    }
  };

  const updateUserLocationOnMap = (location: { lat: number; lng: number }) => {
    if (!googleMapRef.current) return;

    googleMapRef.current.panTo(location);
    //@ts-ignore
    if (googleMapRef.current.getZoom() < 14) {
      googleMapRef.current.setZoom(14);
    }

    const userIcon = {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#06044b" stroke="#ffffff" stroke-width="2">
            <circle cx="12" cy="12" r="10" fill="#06044b" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="#61e987"/>
          </svg>`
        ),
      scaledSize: new window.google.maps.Size(30, 30),
      anchor: new window.google.maps.Point(15, 15),
    };

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(location);
      userMarkerRef.current.setMap(googleMapRef.current);
    } else {
      userMarkerRef.current = new window.google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        title: "Your Location",
        icon: userIcon,
        zIndex: 1000,
      });
      //@ts-ignore
      userMarkerRef.current.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
        infoWindowRef.current?.setContent(`
          <div style="font-family: sans-serif; padding: 5px; text-align: center; color: #06044b;">
            <strong>Your Location</strong>
          </div>
        `);
        infoWindowRef.current?.open(
          googleMapRef.current!,
          userMarkerRef.current!
        );
      });
    }
  };

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setSelectedLocation(location);
    setIsMapOpen(false);
    toast.success(`Location updated: ${location.address}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const renderLocationPermissionMessage = () => {
    if (locationPermission === "granted" && userLocation) return null;

    if (locationPermission === "denied") {
      return (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <MapPinOff className="h-5 w-5 text-yellow-600 mr-2" />
            <AlertDescription className="text-yellow-700">
              Location access denied. Please click "Change Location" above to
              manually select your location, or enable location services and
              refresh the page.
            </AlertDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            onClick={getUserLocation}
          >
            Try Again
          </Button>
        </Alert>
      );
    }

    if (locationPermission === "loading") {
      return (
        <Alert className="mb-4 bg-[#f0fdf4] border-[#90f0ab]">
          <div className="flex items-center">
            <Loader2 className="h-5 w-5 text-[#06044b] mr-2 animate-spin" />
            <AlertDescription>
              Getting your current location...
            </AlertDescription>
          </div>
        </Alert>
      );
    }

    if (locationPermission === "unsupported") {
      return (
        <Alert className="mb-4 bg-gray-50 border-gray-200">
          <AlertDescription>
            Your browser doesn't support geolocation. Please use "Change
            Location" to manually select your location.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="w-full h-[120px] flex items-center bg-[#F4F7FA] px-[330px]">
        {/* heading */}
        <div className="mr-[175px]">
          <h2 className="text-[32px] font-bold">Store Selection</h2>
        </div>
        {/* map and search bar */}
        <div className="flex flex-row">
          {/* map button - opens popup */}
          <div
            className="w-[224px] h-[48px] bg-white border-r-[1px] border-[#C9C9C9] rounded-tl-[12px] rounded-bl-[12px] pl-[19px] flex flex-row items-center hover:cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsMapOpen(true)}
          >
            <LocationPin />
            <p className="ml-[10px] text-[16px] font-medium text-[#555555] truncate">
              {selectedLocation
                ? selectedLocation.address.split(",")[0]
                : userLocation
                ? "Current Location"
                : "Select Location"}
            </p>
          </div>
          {/* search bar */}
          <div className="w-[496px] h-[48px] bg-white rounded-tr-[12px] rounded-br-[12px] flex flex-row items-center">
            <div className="flex items-center pointer-events-none ml-[18px]">
              <Search className="h-[19.52px] w-[19.52px] text-black" />
            </div>
            <Input
              type="text"
              placeholder="Search for your area or shop name"
              className="text-sm text-black rounded-lg w-full border-none outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Map Popup */}
      <MapPopup
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={userLocation}
      />

      {/* Cart Panel */}
      <CartPanel
        isOpen={isCartOpen}
        order={order}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onChangeStore={() => {
          setIsCartOpen(false);
          setSelectedMerchant(null);
          document
            .getElementById("merchant-list")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        selectedMerchant={selectedMerchant}
        merchants={nearbyMerchants}
      />

      <div className="px-[40px] flex flex-col items-center ">
        <div className="flex flex-col items-center py-12 px-4">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />

          <div className="rounded-xl p-8 w-full h-full max-w-6xl mb-8">
            {renderLocationPermissionMessage()}

            {/* heading  */}
            <div className=" h-[32px] flex flex-row items-center mb-[16px]">
              <h3 className="text-[24px] font-bold">Shops near your area</h3>
              <h3 className="h-[32px] text-[16px] ml-[10px] flex items-end">
                (
                {selectedLocation?.address
                  ? selectedLocation.address.length > 30
                    ? `${selectedLocation.address.substring(0, 28)}...`
                    : selectedLocation.address
                  : userLocation
                  ? "Current Location"
                  : "No location selected"}
                )
              </h3>
            </div>

            {isLoadingMerchants ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-[#61e987] animate-spin mb-4" />
                <p className="text-[#06044b]">Finding merchants near you...</p>
                <p className="text-sm text-gray-500 mt-1">
                  This may take a moment
                </p>
              </div>
            ) : filteredMerchants.length > 0 ? (
              <div className="w-[1120px] mx-auto" id="merchant-list">
                {/* Merchant Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
                  {filteredMerchants
                    .sort((a, b) => {
                      if (selectedMerchant === a.merchantId) return -1;
                      if (selectedMerchant === b.merchantId) return 1;
                      return 0;
                    })
                    .map((merchant, idx) => {
                      const isSelected =
                        selectedMerchant === merchant.merchantId;
                      return (
                        <div key={merchant.merchantId} className="relative">
                          {/* Merchant Card */}
                          <div
                            id={`merchant-${merchant.merchantId}`}
                            className={cn(
                              "rounded-xl p-[14px] w-[300px] h-[350px] flex flex-col",
                              "transition-all duration-300 ease-in-out",
                              isSelected
                                ? "border border-[#555555] shadow-lg opacity-100"
                                : "border-none hover:border hover:border-[#555555] hover:shadow-md",
                              selectedMerchant && !isSelected
                                ? "opacity-0 pointer-events-none"
                                : "opacity-100"
                            )}
                          >
                            <div
                              onClick={() =>
                                setSelectedMerchant((prev) =>
                                  prev === merchant.merchantId
                                    ? null
                                    : merchant.merchantId
                                )
                              }
                              className="cursor-pointer flex flex-col flex-1"
                            >
                              {/* Content area: scrollable if content is too much */}
                              <div className="flex-grow overflow-y-auto">
                                {/* //merchant image */}
                                <div>
                                  <MerchantImage
                                    src={
                                      merchant.MerchantImages[0] ||
                                      "/shopimage.png"
                                    }
                                    alt={merchant.shopName}
                                    googleDistance={merchant.googleDistance}
                                    duration={merchant.duration}
                                    deliveryType="Pick Up" // or "Home Delivery" if appropriate
                                  />
                                </div>
                                <div className="pt-4">
                                  <div className="flex justify-between items-start mb-[7px]">
                                    <h4 className="text-[20px] font-bold text-[#000000] leading-tight">
                                      {merchant.shopName}
                                    </h4>
                                    <span className="w-[57px] h-[26px] flex flex-row items-center justify-center text-sm font-bold text-white bg-[#24873D] px-2 py-0.5 rounded-full">
                                      {parseFloat(
                                        merchant.averageRating
                                      ).toFixed(1)}{" "}
                                      ★
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 truncate mb-[15px]">
                                    {merchant.address &&
                                    merchant.address.length > 30
                                      ? `${merchant.address.substring(
                                          0,
                                          28
                                        )}...`
                                      : merchant.address}
                                  </p>
                                  {/* FEATURES */}
                                  <div className="flex flex-row gap-2 flex-wrap">
                                    {merchant.features.map((feature, index) => (
                                      <div
                                        key={index}
                                        className="bg-[#E6E6ED] rounded-[34px] px-[10px] py-[5px] text-[12px] w-fit text-[#000000] hover:bg-[#d6d6dd] transition-colors duration-300"
                                      >
                                        {feature}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Navigation (fixed at bottom of card) */}
                              <BottomNavigation
                                merchant={merchant}
                                selectedMerchant={selectedMerchant}
                                setSelectedMerchant={setSelectedMerchant}
                                hoveredMerchant={hoveredMerchant}
                                setHoveredMerchant={setHoveredMerchant}
                              />
                            </div>
                          </div>

                          {/* If selected, render summary bar right below this card */}
                          {isSelected && (
                            <SummaryBarSelected
                              idx={idx}
                              order={order}
                              selectedMerchant={selectedMerchant}
                              isLoadingMerchants={isLoadingMerchants}
                              handleViewCart={handleViewCart}
                            />
                          )}
                        </div>
                      );
                    })}

                  {/* Summary bar as last grid item when no merchant is selected */}
                  {!selectedMerchant && (
                    <SummaryBarNotSelected
                      order={order}
                      isLoadingMerchants={isLoadingMerchants}
                      handleViewCart={handleViewCart}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPinOff className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No merchants found matching your search.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search or location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
