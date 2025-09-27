import * as React from "react"
import { Button } from "~/components/ui/button"
import { isValidPhoneNumber } from "~/lib/utils"
import { cn } from "~/lib/utils"

interface ContactFormProps {
  onSubmit: (data: { phoneNumber: string; name?: string }) => void
  loading?: boolean
  className?: string
  initialValues?: {
    phoneNumber?: string
    name?: string
  }
}

export function ContactForm({ onSubmit, loading = false, className, initialValues }: ContactFormProps) {
  const [phoneNumber, setPhoneNumber] = React.useState(initialValues?.phoneNumber || '')
  const [name, setName] = React.useState(initialValues?.name || '')
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại là bắt buộc'
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      phoneNumber: phoneNumber.trim(),
      name: name.trim() || undefined,
    })
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')

    // Auto-format Vietnamese phone numbers
    if (digits.startsWith('84')) {
      return '+84' + digits.slice(2)
    } else if (digits.startsWith('0')) {
      return digits
    } else if (digits.length > 0) {
      return '0' + digits
    }

    return digits
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)

    // Clear error when user starts typing
    if (errors.phoneNumber) {
      setErrors(prev => ({ ...prev, phoneNumber: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* Phone Number Field */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="0901234567 hoặc +84901234567"
          className={cn(
            "w-full px-3 py-2 border rounded-md text-sm",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            errors.phoneNumber
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          )}
          disabled={loading}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
        )}
        <p className="mt-1 text-xs text-gray-700">
          Chúng tôi sẽ gửi thông tin đơn hàng qua SMS
        </p>
      </div>

      {/* Name Field (Optional) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Họ và tên <span className="text-gray-600">(không bắt buộc)</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          maxLength={50}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-md text-sm",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          )}
          disabled={loading}
        />
        <p className="mt-1 text-xs text-gray-700">
          Giúp nhân viên giao hàng xác nhận chính xác hơn
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading || !phoneNumber.trim()}
      >
        {loading ? 'Đang xử lý...' : 'Tiếp tục'}
      </Button>
    </form>
  )
}

// Specialized OTP Input Component
interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  onComplete?: (code: string) => void
  length?: number
  loading?: boolean
  error?: string
}

export function OTPInput({
  value,
  onChange,
  onComplete,
  length = 6,
  loading = false,
  error
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/\D/g, '').slice(-1)

    const newValue = value.split('')
    newValue[index] = digit
    const updatedValue = newValue.join('')

    onChange(updatedValue)

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Trigger completion if all fields are filled
    if (updatedValue.length === length && onComplete) {
      onComplete(updatedValue)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pastedData)

    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, length - 1)
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-center">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "w-12 h-12 text-center text-lg font-semibold border rounded-lg",
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300",
              loading && "opacity-50 cursor-not-allowed"
            )}
            disabled={loading}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  )
}