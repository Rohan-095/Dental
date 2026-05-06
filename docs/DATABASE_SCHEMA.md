# Database Schema (Phase 2)

## leads
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | required |
| phone | text | required |
| email | text | optional |
| message | text | optional |
| source | text | 'chat' \| 'form' \| 'voice' |
| created_at | timestamptz | default now() |

## conversations
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| lead_id | uuid | FK → leads.id |
| messages | jsonb | array of {from, text, ts} |
| urgent | boolean | keyword detection flag |
| created_at | timestamptz | |

## appointments
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| lead_id | uuid | FK → leads.id |
| service | text | |
| preferred_date | date | |
| preferred_time | text | |
| status | text | 'pending' \| 'confirmed' \| 'cancelled' |
| created_at | timestamptz | |
