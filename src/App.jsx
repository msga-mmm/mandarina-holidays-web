import React, { useMemo, useState } from 'react';
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
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Francais' }
];

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function shiftMonth(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function App() {
  const { t, i18n } = useTranslation();
  const hd = useMemo(() => new Holidays(), []);
  const countries = useMemo(() => {
    const countryMap = hd.getCountries();
    return Object.entries(countryMap)
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [hd]);

  const defaultCountry = countries.find((country) => country.code === 'US')?.code ?? countries[0]?.code ?? '';

  const [countryCode, setCountryCode] = useState(defaultCountry);
  const [monthDate, setMonthDate] = useState(startOfMonth(new Date()));
  const activeLanguage = LANGUAGE_OPTIONS.some((option) => option.code === i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : 'en';

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

  const holidaysInMonth = useMemo(() => {
    if (!countryCode) return [];

    const countryHolidays = new Holidays(countryCode);
    const allHolidays = countryHolidays.getHolidays(monthDate.getFullYear()) ?? [];

    return allHolidays
      .filter((holiday) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getMonth() === monthDate.getMonth();
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [countryCode, monthDate]);

  const countryName = countries.find((country) => country.code === countryCode)?.name ?? countryCode;

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

            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel id="language-select-label">{t('language')}</InputLabel>
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

          <Autocomplete
            id="country-combobox"
            options={countries}
            value={countries.find((country) => country.code === countryCode) ?? null}
            onChange={(_, value) => setCountryCode(value?.code ?? '')}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            getOptionLabel={(option) => `${option.name} (${option.code})`}
            renderInput={(params) => <TextField {...params} label={t('country')} />}
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
            <Button variant="contained" onClick={() => setMonthDate((value) => shiftMonth(value, 1))}>
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
                <ListItem key={`${holiday.date}-${holiday.name}`} divider sx={{ px: 0 }}>
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
