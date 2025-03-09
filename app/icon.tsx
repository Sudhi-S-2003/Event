import { ImageResponse } from 'next/og'
import IconComponent from "../components/Icon"
// Image metadata
export const size = {
  width: 40,
  height: 40,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <IconComponent />
    ),
  
    {
    
      ...size,
    }
  )
}