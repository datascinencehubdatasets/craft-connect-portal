
import { useLanguage } from "@/contexts/LanguageContext";

export function useCurrencyFormatter() {
  const { language, t } = useLanguage();
  
  const formatCurrency = (amount: number): string => {
    const currencySymbol = t('currency.symbol');
    const format = t('currency.format');
    
    let formattedAmount: string;
    
    // Format based on language
    if (language === 'kk' || language === 'ru') {
      // Kazakh/Russian format: spaces for thousands, comma for decimals
      formattedAmount = amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return `${formattedAmount} ${currencySymbol}`;
    } else {
      // Default/English format
      formattedAmount = amount.toFixed(0);
      return `${currencySymbol}${formattedAmount}`;
    }
  };
  
  return formatCurrency;
}
