import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async({ latitude, longitude, label })=>
    axios
    .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,weathercode,windspeed_10m,windgusts_10m,winddirection_10m,precipitation,precipitation_probability,cloudcover,is_day,relativehumidity_2m,dewpoint_2m,visibility,uv_index,shortwave_radiation&daily=sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&wind_speed_unit=kmh&precipitation_unit=mm&timezone=auto`)
    .then(response => ({
        id: `${latitude},${longitude}`,
        label,
        latitude,
        longitude,
        weather: response.data,
    }))
)

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        removeLocation: (state, action) => {
            const idToRemove = action.payload
            state.data = state.data.filter(item => item.id !== idToRemove)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchWeather.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchWeather.fulfilled, (state, action ) => {
            state.loading = false

            const newLocation = {
                ...action.payload,
                fetchedAt: Date.now()
            };
            const index = state.data.findIndex(item => item.id === newLocation.id);
            index !== -1 ? state.data[index] = newLocation : state.data.push(newLocation);

            state.error = ''
        })
        builder.addCase(fetchWeather.rejected, (state, action ) => {
            state.loading = false,
            state.error = action.error.message
        })
    }
})

export const { removeLocation } = weatherSlice.actions
export default weatherSlice.reducer