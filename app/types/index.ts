// Shared types for the DEECEE HAIR application

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  colors: string[];
  sizes: string[];
  category: string;
  description?: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isMans?: boolean;
  sizePricing?: Record<string, number>; // Dynamic pricing per size
  textures?: string[]; // Available textures (Straight, Wavy, Curly, etc.)
  sizeTexturePricing?: Record<string, Record<string, number>>; // Pricing per size-texture combination
};

export type CartItem = {
  product: Product;
  color: string;
  size: string;
  quantity: number;
  texture?: string; // Selected texture
};

export type Appointment = {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export type Page = "home" | "shop" | "product" | "cart" | "checkout" | "contact" | "appointment" | "terms" | "privacy" | "about" | "profile" | "bestsellers" | "admin-login" | "admin-dashboard";

export type ReelVideo = {
  id: number;
  src: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
};

export type Order = {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  items: CartItem[];
  shippingAddress: Address;
  subtotal: number;
  shippingCharges: number;
  tax: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  paymentMethod: "Razorpay" | "UPI";
  paymentId?: string;
  trackingId?: string;
  createdAt: string;
  updatedAt?: string;
  deliveredAt?: string;
  notes?: string;
};

export type Address = {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export type WishlistItem = {
  id: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  addedAt: Date;
};

export type ProfileTab = "profile" | "orders" | "addresses" | "security" | "wishlist";

// Admin types
export type Admin = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "superadmin";
  createdAt: string;
};

export type AdminStats = {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  completedOrders: number;
};

export type AdminOrder = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: Address;
};

export type AdminUser = {
  id: string;
  email: string;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  disabled: boolean;
  createdAt: string;
  lastSignInTime: string | null;
  totalOrders: number;
  totalSpent: number;
};

export type AdminDashboardTab = "overview" | "products" | "orders" | "users" | "appointments";

// Common form validation patterns
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\d{10}$/;

// Common UI component props
export type FormInputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

// Form validation helper
export const createFormErrors = (fields: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (fields.name !== undefined && !fields.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (fields.email !== undefined && !EMAIL_REGEX.test(fields.email)) {
    errors.email = "Enter a valid email";
  }

  if (fields.phone !== undefined && !PHONE_REGEX.test(fields.phone.replace(/\D/g, ""))) {
    errors.phone = "Enter a 10-digit phone number";
  }

  if (fields.message !== undefined && fields.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters";
  }

  if (fields.password !== undefined && fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (fields.confirmPassword !== undefined && fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};