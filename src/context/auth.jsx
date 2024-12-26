const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showp, setShowp] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, showp, setShowp }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
