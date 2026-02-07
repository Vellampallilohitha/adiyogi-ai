import usePremium from "../hooks/usePremium";

export function hasAccess(feature){
    const isPremium = usePremium();

    if(!isPremium) return false;

    return true;
}