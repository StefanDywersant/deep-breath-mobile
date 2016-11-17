/**
 * Maps parameter code to parameter name.
 * @type {object.<string, string>}
 */
const map = {
	bzn: 'Benzene C₆H₆',
	co: 'Carbon monoxide',
	ebzn: 'Ethylbenzene C₈H₁₀',
	hcho: 'Formaldehyde',
	hg: 'Mercury gas',
	mpxy: 'M-P-Xylene C₈H₁₀',
	no: 'Nitrogen monoxide NO',
	no2: 'Nitrogen dioxide NO₂',
	nox: 'Nitrogen oxides NOₓ',
	o3: 'Ozone O₃',
	oxy: 'O-Xylene C₈H₁₀',
	pb: 'Lead',
	pm10: 'Particulate matter PM₁₀',
	pm10_as: 'Arsenic in PM₁₀',
	pm10_baa: 'Benzo(a)anthracene in PM₁₀',
	pm10_bap: 'Benzo(a)pyrene in PM₁₀',
	pm10_bbf: 'Benzo(b)fluoranthene in PM₁₀',
	pm10_bjf: 'Benzo(j)fluoranthene in PM₁₀',
	pm10_bkf: 'Benzo(k)fluoranthene in PM₁₀',
	pm10_cd: 'Kadm in PM₁₀',
	pm10_dbaha: 'Dibenzo(a,h)anthracene in PM₁₀',
	pm10_ip: 'Indeno(1,2,3-cd)pyrene in PM₁₀',
	pm10_ni: 'Nickel in PM₁₀',
	pm10_pb: 'Lead in PM₁₀',
	'pm2.5': 'Particulate matter PM₂.₅',
	rad: 'Global radiation',
	so2: 'Sulphur dioxide SO₂',
	tln: 'Toluene C₇H₈',
	uvb: 'UVB radiation',
	humid: 'Relative humidity',
	press: 'Atmospheric pressure',
	rain: 'Precipitation',
	temp: 'Temperature',
	wd: 'Wind direction',
	ws: 'Wind speed'
};

export default (code) => {
	if (!map.hasOwnProperty(code))
		return null;

	return map[code];
}
