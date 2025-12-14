export function login({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject("Invalid credentials");
        } else {
          resolve({
            id: "user",
            name: "user",
            email,
          });
        }
      }, 800); // realistic network delay
    });
  }
  