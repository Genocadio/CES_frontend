// Simple test file to verify authentication hooks
// This can be used for testing the authentication system

// Example usage:
// const { login, register, isLoading, error } = useAuthApi()

// Test login
export async function testLogin(emailOrPhone: string) {
  try {
    // This function should not use React hooks - it's a utility function
    // For testing purposes, you should call this from within a React component
    console.log('testLogin called with:', emailOrPhone)
    return null
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

// Test register
export async function testRegister(name: string, phone: string, password: string, email?: string) {
  try {
    // This function should not use React hooks - it's a utility function
    // For testing purposes, you should call this from within a React component
    console.log('testRegister called with:', name, phone, email)
    return null
  } catch (error) {
    console.error('Register error:', error)
    return null
  }
}

// Test name parsing
export function testNameParsing() {
  const testNames = [
    "John",
    "John Doe", 
    "John Middle Doe",
    "John A B C Doe",
    "Jean Baptiste",
    "Marie Uwimana"
  ]
  
  console.log('Testing name parsing:')
  testNames.forEach(name => {
    const parts = name.trim().split(' ').filter(part => part.length > 0)
    let result
    
    if (parts.length === 1) {
      result = {
        firstName: parts[0],
        lastName: undefined,
        middleName: undefined
      }
    } else if (parts.length === 2) {
      result = {
        firstName: parts[0],
        lastName: parts[1],
        middleName: undefined
      }
    } else {
      result = {
        firstName: parts[0],
        lastName: parts[parts.length - 1],
        middleName: parts.slice(1, -1).join(' ')
      }
    }
    
    console.log(`"${name}" ->`, result)
  })
}
