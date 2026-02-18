import { useMemo, useState, useEffect } from 'react';
import Holidays from 'date-holidays';
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  TextField,
  Paper,
  Select,
  Stack,
  Typography,
  IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './hooks/useTheme';

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Francais' }
];

interface Country {
  code: string;
  name: string;
}

interface Holiday {
  date: string;
  start: Date;
  end: Date;
  name: string;
  type: string;
  rule: string;
  note?: string | null;
  observance?: string | null;
  wording?: string | null;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function shiftMonth(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function App() {
  const { t, i18n } = useTranslation();
  const hd = useMemo(() => new Holidays(), []);
  const countries: Country[] = useMemo(() => {
    const countryMap = hd.getCountries();
    return Object.entries(countryMap)
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [hd]);

  const defaultCountry =
    countries.find((country) => country.code === 'US')?.code ??
    countries[0]?.code ??
    '';

  const [countryCode, setCountryCode] = useState<string>(() => {
    const storedCountry = localStorage.getItem('countryCode');
    return storedCountry || defaultCountry;
  });
  const [monthDate, setMonthDate] = useState<Date>(startOfMonth(new Date()));
  const activeLanguage = LANGUAGE_OPTIONS.some(
    (option) => option.code === i18n.resolvedLanguage
  )
    ? i18n.resolvedLanguage
    : 'en';

  const { mode, toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('countryCode', countryCode);
  }, [countryCode]);

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(activeLanguage, {
        month: 'long',
        year: 'numeric'
      }),
    [activeLanguage]
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(activeLanguage, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
    [activeLanguage]
  );

  const holidaysInMonth: Holiday[] = useMemo(() => {
    if (!countryCode) return [];

    const countryHolidays = new Holidays(countryCode);
    const allHolidays =
      (countryHolidays.getHolidays(monthDate.getFullYear()) as Holiday[]) ?? [];

    return allHolidays
      .filter((holiday: Holiday) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getMonth() === monthDate.getMonth();
      })
      .sort(
        (a: Holiday, b: Holiday) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [countryCode, monthDate]);

  const countryName =
    countries.find((country) => country.code === countryCode)?.name ??
    countryCode;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            spacing={1}
          >
            <Typography component="h1" variant="h4">
              {t('appTitle')}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <FormControl size="small" sx={{ minWidth: 170 }}>
                <InputLabel id="language-select-label">
                  {t('language')}
                </InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-select"
                  label={t('language')}
                  value={activeLanguage}
                  onChange={(event) => i18n.changeLanguage(event.target.value)}
                >
                  {LANGUAGE_OPTIONS.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                      {language.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Autocomplete
            id="country-combobox"
            options={countries}
            value={
              countries.find((country) => country.code === countryCode) ?? null
            }
            onChange={(_, value) => setCountryCode(value?.code ?? '')}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            getOptionLabel={(option) => `${option.name} (${option.code})`}
            renderInput={(params) => (
              <TextField {...params} label={t('country')} />
            )}
          />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            spacing={1}
          >
            <Button
              variant="contained"
              onClick={() => setMonthDate((value) => shiftMonth(value, -1))}
            >
              {t('previous')}
            </Button>
            <Typography component="strong" variant="h6" textAlign="center">
              {monthFormatter.format(monthDate)}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setMonthDate((value) => shiftMonth(value, 1))}
            >
              {t('next')}
            </Button>
          </Stack>

          <Typography component="h2" variant="h6">
            {t('holidaysInMonth', {
              country: countryName,
              month: monthFormatter.format(monthDate)
            })}
          </Typography>

          {holidaysInMonth.length === 0 ? (
            <Typography color="text.secondary">{t('noHolidays')}</Typography>
          ) : (
            <List disablePadding>
              {holidaysInMonth.map((holiday) => (
                <ListItem
                  key={`${holiday.date}-${holiday.name}`}
                  divider
                  sx={{ px: 0 }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                    width="100%"
                    spacing={0.5}
                  >
                    <Typography fontWeight={600}>{holiday.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {dateFormatter.format(new Date(holiday.date))}
                    </Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
