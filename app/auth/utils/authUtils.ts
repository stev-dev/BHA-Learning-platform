// auth/utils/authUtils.ts
import axios from "axios";

// Types pour les réponses de l'API
interface ApiResponse {
  message: string;
  token?: string;
  user?: UserData;
}

interface UserData {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  isPartenaire?: boolean;
}

// Type pour les erreurs d'authentification
interface AuthError {
  message: string;
  code?: string;
  errors?: { [key: string]: string };
}

// Interface pour les données d'inscription
interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  password: string;
  confirmPassword?: string;
  isPartenaire?: boolean;
  nomEntreprise?: string;
  siteWeb?: string;
  secteurActivite?: string;
}

/**
 * Fonction pour inscrire un nouvel utilisateur
 * @param userData Données d'inscription de l'utilisateur
 * @returns Promise avec la réponse de l'API
 */
export const registerUser = async (
  userData: RegisterData
): Promise<ApiResponse> => {
  try {
    // Préparation des données à envoyer à l'API
    const dataToSend = {
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      telephone: userData.telephone || null,
      password: userData.password,
      role: userData.isPartenaire ? "partenaire" : "adherent",
    };

    // Ajout des informations spécifiques aux partenaires si nécessaire
    if (userData.isPartenaire) {
      Object.assign(dataToSend, {
        partenaire_info: {
          nom_entreprise: userData.nomEntreprise,
          site_web: userData.siteWeb || null,
          secteur_activite: userData.secteurActivite,
        },
      });
    }

    const response = await axios.post<ApiResponse>(
      "http://localhost:8000/api/register",
      dataToSend
    );

    return response.data;
  } catch (error: any) {
    const authError: AuthError = {
      message: error.response?.data?.message || "Erreur lors de l'inscription",
      errors: error.response?.data?.errors,
    };
    throw authError;
  }
};

/**
 * Fonction pour authentifier un utilisateur
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Promise avec les données de l'utilisateur
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      "http://localhost:8000/api/login",
      {
        email,
        password,
      }
    );

    // Stockage du token dans le localStorage ou cookies si nécessaire
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);

      // On peut également stocker des informations sur l'utilisateur
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    }

    return response.data;
  } catch (error: any) {
    const authError: AuthError = {
      message: error.response?.data?.message || "Erreur d'authentification",
    };
    throw authError;
  }
};

/**
 * Vérifier si l'utilisateur est connecté
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("authToken");
  }
  return false;
};

/**
 * Vérifier si l'utilisateur connecté est un partenaire
 * @returns boolean
 */
export const isPartenaireUser = (): boolean => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return !!user.isPartenaire;
      } catch {
        return false;
      }
    }
  }
  return false;
};

/**
 * Récupérer les informations de l'utilisateur connecté
 * @returns UserData | null
 */
export const getCurrentUser = (): UserData | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
  }
  return null;
};

/**
 * Déconnecter l'utilisateur
 */
export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};
