-- ==========================================================
-- CalcPilot Database Schema (PostgreSQL)
-- ==========================================================

-- Enable UUID extension for secure identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    preferred_currency VARCHAR(10) DEFAULT 'INR',
    default_loan_type VARCHAR(50) DEFAULT 'Home',
    default_tax_regime VARCHAR(10) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for email search optimizations
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. SAVED CALCULATIONS TABLE
CREATE TABLE IF NOT EXISTS saved_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'emi', 'sip', 'tax', etc.
    inputs JSONB NOT NULL,     -- raw input values
    outputs JSONB NOT NULL,    -- raw calculated outcomes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on user and type to accelerate queries
CREATE INDEX IF NOT EXISTS idx_saved_calc_user ON saved_calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_calc_type ON saved_calculations(type);

-- 3. ADVERTISEMENTS CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS ad_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    destination_url VARCHAR(1024) NOT NULL,
    placement VARCHAR(50) NOT NULL, -- 'home_top', 'calc_inline', etc.
    target_calculator VARCHAR(50),  -- e.g. target EMI pages
    target_country VARCHAR(100),    -- country geotargeting
    active BOOLEAN DEFAULT TRUE,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on active placements
CREATE INDEX IF NOT EXISTS idx_ads_placement_active ON ad_campaigns(placement, active);

-- 4. ANALYTICS EVENT LOGS TABLE
CREATE TABLE IF NOT EXISTS analytics_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    calculator_type VARCHAR(50) NOT NULL,
    duration_seconds INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_logs(created_at);
